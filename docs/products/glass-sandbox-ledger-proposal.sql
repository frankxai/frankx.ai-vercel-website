-- PROPOSAL ONLY. Not applied. Separate owner-reviewed migration and sandbox DB required.
-- Transactional business truth belongs in the existing Supabase/Postgres owner.
CREATE SCHEMA IF NOT EXISTS commerce_sandbox;
REVOKE ALL ON SCHEMA commerce_sandbox FROM PUBLIC, anon, authenticated;
CREATE TABLE IF NOT EXISTS commerce_sandbox.attempts (session_id text PRIMARY KEY, payload jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS commerce_sandbox.entitlements (session_id text PRIMARY KEY, payment_intent text UNIQUE NOT NULL, payload jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS commerce_sandbox.events (event_id text PRIMARY KEY, operation text NOT NULL, identity text NOT NULL);
CREATE TABLE IF NOT EXISTS commerce_sandbox.revoked_payments (payment_intent text PRIMARY KEY);
ALTER TABLE commerce_sandbox.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_sandbox.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_sandbox.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_sandbox.revoked_payments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA commerce_sandbox FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.glass_sandbox_command(operation text, payload jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  v_old jsonb; v_new jsonb; v_attempt jsonb; v_session text; v_payment text; v_event text;
  v_operation text; v_identity text; v_revoked boolean;
BEGIN
  IF operation = 'register' THEN
    v_session := payload->>'sessionId';
    IF NOT COALESCE(jsonb_typeof(payload)='object' AND payload ?& ARRAY['sessionId','subjectId','productId','edition','sourceSha','artifactId','artifactSha256','artifactBytes','priceId','amount','currency','termsVersion','termsSha256','termsScope','acceptedAt']
      AND v_session ~ '^cs_test_[A-Za-z0-9_]{1,200}$' AND payload->>'productId' = 'aurora-ui-kit'
      AND payload->>'subjectId' ~ '^[A-Za-z0-9][A-Za-z0-9:_-]{0,127}$'
      AND payload->>'edition' = 'essential' AND payload->>'sourceSha' ~ '^[a-f0-9]{40}$'
      AND payload->>'artifactSha256' ~ '^[a-f0-9]{64}$' AND payload->>'currency' = 'eur'
      AND (payload->>'artifactBytes')::integer BETWEEN 1 AND 20000000
      AND payload->>'artifactId' ~ '^[a-z0-9][a-z0-9._-]{0,150}$'
      AND payload->>'priceId' ~ '^price_[A-Za-z0-9_]{1,200}$'
      AND (payload->>'amount')::integer = 7900
      AND payload->>'termsVersion' ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$'
      AND payload->>'termsSha256' ~ '^[a-f0-9]{64}$' AND payload->>'termsScope' = 'sandbox-rehearsal-only'
      AND payload->>'acceptedAt' ~ '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$'
      AND (payload->>'acceptedAt')::timestamptz <= now(),false) THEN RAISE EXCEPTION 'invalid sandbox binding'; END IF;
    PERFORM pg_advisory_xact_lock(hashtextextended('glass-attempt:' || v_session, 0));
    INSERT INTO commerce_sandbox.attempts VALUES (v_session,payload) ON CONFLICT DO NOTHING;
    SELECT a.payload INTO v_old FROM commerce_sandbox.attempts a WHERE a.session_id=v_session;
    IF v_old IS DISTINCT FROM payload THEN RAISE EXCEPTION 'purchase binding conflict'; END IF;
    RETURN 'null'::jsonb;
  ELSIF operation IN ('attempt','entitlement') THEN
    v_session := payload->>'sessionId';
    IF operation='attempt' THEN SELECT a.payload INTO v_old FROM commerce_sandbox.attempts a WHERE a.session_id=v_session;
    ELSE SELECT e.payload INTO v_old FROM commerce_sandbox.entitlements e WHERE e.session_id=v_session; END IF;
    RETURN v_old;
  ELSIF operation NOT IN ('grant','revoke') THEN RAISE EXCEPTION 'unknown sandbox operation'; END IF;
  v_event := payload->>'eventId';
  IF NOT COALESCE(v_event ~ '^evt_[A-Za-z0-9_]{1,200}$',false) THEN RAISE EXCEPTION 'invalid event'; END IF;
  v_new := payload->'entitlement';
  v_session := v_new->>'sessionId';
  v_payment := CASE WHEN operation='grant' THEN v_new->>'paymentIntent' ELSE payload->>'paymentIntent' END;
  IF NOT COALESCE(v_payment ~ '^pi_[A-Za-z0-9_]{1,200}$',false) THEN RAISE EXCEPTION 'invalid payment'; END IF;
  v_identity := CASE WHEN operation='grant' THEN v_session ELSE v_payment END;
  PERFORM pg_advisory_xact_lock(hashtextextended('glass-event:' || v_event,0));
  SELECT e.operation,e.identity INTO v_operation,v_session FROM commerce_sandbox.events e WHERE e.event_id=v_event;
  IF FOUND THEN
    IF v_operation<>operation OR v_session<>v_identity THEN RAISE EXCEPTION 'event identity conflict'; END IF;
    RETURN '"duplicate"'::jsonb;
  END IF;
  v_session := v_new->>'sessionId';
  PERFORM pg_advisory_xact_lock(hashtextextended('glass-payment:' || v_payment,0));
  IF operation='grant' THEN
    SELECT a.payload INTO v_attempt FROM commerce_sandbox.attempts a WHERE a.session_id=v_session FOR UPDATE;
    IF v_attempt IS NULL OR (v_new - ARRAY['paymentIntent','state']) IS DISTINCT FROM v_attempt THEN RAISE EXCEPTION 'unbound grant'; END IF;
    SELECT e.payload INTO v_old FROM commerce_sandbox.entitlements e WHERE e.session_id=v_session;
    IF v_old IS NOT NULL AND v_old->>'paymentIntent'<>v_payment THEN RAISE EXCEPTION 'payment identity conflict'; END IF;
    v_revoked := COALESCE(v_old->>'state'='revoked',false) OR EXISTS(SELECT 1 FROM commerce_sandbox.revoked_payments r WHERE r.payment_intent=v_payment);
    v_new := jsonb_set(v_new,'{state}',to_jsonb(CASE WHEN v_revoked THEN 'revoked'::text ELSE 'active'::text END));
    INSERT INTO commerce_sandbox.entitlements VALUES (v_session,v_payment,v_new)
      ON CONFLICT(session_id) DO UPDATE SET payload=EXCLUDED.payload;
  ELSE
    INSERT INTO commerce_sandbox.revoked_payments VALUES (v_payment) ON CONFLICT DO NOTHING;
    UPDATE commerce_sandbox.entitlements e SET payload=jsonb_set(e.payload,'{state}','"revoked"'::jsonb) WHERE e.payment_intent=v_payment;
  END IF;
  INSERT INTO commerce_sandbox.events VALUES (v_event,operation,v_identity);
  RETURN '"applied"'::jsonb;
END $$;
REVOKE ALL ON FUNCTION public.glass_sandbox_command(text,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.glass_sandbox_command(text,jsonb) TO service_role;
