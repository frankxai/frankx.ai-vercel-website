-- Local test-mode projection on the #1322 ledger. Deploying this file requires
-- review of the host's subject binding and preference/evidence authorities.
BEGIN;

-- The existing Glass ledger has one merchant. Never reinterpret it as another
-- tenant's orders. The four inputs below intentionally have no application writer.
CREATE TABLE IF NOT EXISTS commerce_sandbox.purpose_receipts (
  subject_id text NOT NULL,
  purpose text NOT NULL CHECK (purpose IN ('compatibility','upgrades','creator_research')),
  revision bigint NOT NULL CHECK (revision > 0),
  opted_in boolean NOT NULL,
  receipt_sha text NOT NULL CHECK (receipt_sha ~ '^[0-9a-f]{64}$'),
  PRIMARY KEY(subject_id,purpose,revision)
);

CREATE TABLE IF NOT EXISTS commerce_sandbox.assistance_facts (
  subject_id text NOT NULL,
  source_sha text NOT NULL CHECK (source_sha ~ '^[0-9a-f]{40}$'),
  kind text NOT NULL CHECK (kind IN ('verified_incompatibility','verified_upgrade','requested_compatibility')),
  target_sha text CHECK (target_sha ~ '^[0-9a-f]{40}$'),
  receipt_sha text NOT NULL CHECK (receipt_sha ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz NOT NULL,
  CHECK ((kind='verified_upgrade')=(target_sha IS NOT NULL)),
  CHECK (target_sha IS NULL OR target_sha<>source_sha),
  PRIMARY KEY(subject_id,source_sha,kind)
);

CREATE TABLE IF NOT EXISTS commerce_sandbox.creator_readers (
  subject_id text PRIMARY KEY,
  approval_sha text NOT NULL CHECK (approval_sha ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz NOT NULL
);

-- A reviewed floor is a policy record, never a caller-supplied query parameter.
CREATE TABLE IF NOT EXISTS commerce_sandbox.cohort_policy (
  purpose text PRIMARY KEY CHECK (purpose='requested_compatibility'),
  minimum_people integer NOT NULL CHECK (minimum_people>=2),
  approval_sha text NOT NULL CHECK (approval_sha ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz NOT NULL
);

ALTER TABLE commerce_sandbox.purpose_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_sandbox.assistance_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_sandbox.creator_readers ENABLE ROW LEVEL SECURITY;
ALTER TABLE commerce_sandbox.cohort_policy ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE VIEW commerce_sandbox.current_opt_ins AS
SELECT subject_id,purpose FROM (
  SELECT DISTINCT ON (subject_id,purpose) subject_id,purpose,opted_in
  FROM commerce_sandbox.purpose_receipts ORDER BY subject_id,purpose,revision DESC
) latest WHERE opted_in;

-- Distinct people and purchased revisions. Repeated purchases cannot inflate
-- creator demand; a revoked order is excluded regardless of its outbox history.
CREATE OR REPLACE VIEW commerce_sandbox.active_glass_buyers AS
SELECT DISTINCT e.payload->>'subjectId' AS subject_id, e.payload->>'sourceSha' AS source_sha
FROM commerce_sandbox.entitlements e
WHERE e.payload->>'state'='active' AND e.payload->>'productId'='aurora-ui-kit'
  AND e.payload->>'edition'='essential'
  AND EXISTS (SELECT FROM commerce_sandbox.access_events x
              WHERE x.session_id=e.session_id AND x.kind='entitlement.granted');

REVOKE ALL ON commerce_sandbox.purpose_receipts, commerce_sandbox.assistance_facts,
  commerce_sandbox.creator_readers, commerce_sandbox.cohort_policy,
  commerce_sandbox.current_opt_ins, commerce_sandbox.active_glass_buyers
  FROM PUBLIC, anon, authenticated, service_role;

-- The host supplies the verified principal. No email, arbitrary recipient,
-- notification text, storage keys or seller-provided instructions are returned.
CREATE OR REPLACE FUNCTION public.glass_assistance_v1(
  tenant_id text, principal_id text, requested_purpose text
) RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path='' AS $$
DECLARE
  fact_kind text;
  fact commerce_sandbox.assistance_facts%ROWTYPE;
BEGIN
  IF tenant_id IS DISTINCT FROM 'frankx-glass-sandbox'
     OR requested_purpose IS NULL OR requested_purpose NOT IN ('compatibility','upgrades')
     OR NOT EXISTS (SELECT FROM commerce_sandbox.active_glass_buyers b WHERE b.subject_id=principal_id)
  THEN RETURN '{"status":"unavailable"}'; END IF;
  IF NOT EXISTS (SELECT FROM commerce_sandbox.current_opt_ins c
                 WHERE c.subject_id=principal_id AND c.purpose=requested_purpose)
  THEN RETURN '{"status":"opt_in_required"}'; END IF;
  fact_kind := CASE requested_purpose WHEN 'compatibility' THEN 'verified_incompatibility' ELSE 'verified_upgrade' END;
  SELECT f.* INTO fact FROM commerce_sandbox.assistance_facts f
  JOIN commerce_sandbox.active_glass_buyers b USING(subject_id,source_sha)
  WHERE f.subject_id=principal_id AND f.kind=fact_kind AND f.expires_at>CURRENT_TIMESTAMP
    AND NOT EXISTS (SELECT FROM commerce_sandbox.active_glass_buyers owned
                    WHERE owned.subject_id=principal_id AND owned.source_sha=f.target_sha)
  ORDER BY f.expires_at DESC, f.receipt_sha LIMIT 1;
  IF NOT FOUND THEN RETURN '{"status":"insufficient_evidence"}'; END IF;
  RETURN jsonb_strip_nulls(jsonb_build_object('status','available','kind',fact.kind,
    'product','aurora-ui-kit','edition','essential','sourceSha',fact.source_sha,'targetSha',fact.target_sha));
END $$;

CREATE OR REPLACE FUNCTION public.glass_creator_opportunities_v1(
  tenant_id text, principal_id text
) RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path='' AS $$
DECLARE minimum_people integer; people bigint;
BEGIN
  IF tenant_id IS DISTINCT FROM 'frankx-glass-sandbox' OR NOT EXISTS (
    SELECT FROM commerce_sandbox.creator_readers r WHERE r.subject_id=principal_id AND r.expires_at>CURRENT_TIMESTAMP
  ) THEN RETURN '{"status":"unavailable"}'; END IF;
  SELECT p.minimum_people INTO minimum_people FROM commerce_sandbox.cohort_policy p
  WHERE p.purpose='requested_compatibility' AND p.expires_at>CURRENT_TIMESTAMP;
  IF NOT FOUND THEN RETURN '{"status":"insufficient_evidence"}'; END IF;
  SELECT count(DISTINCT b.subject_id) INTO people
  FROM commerce_sandbox.active_glass_buyers b
  JOIN commerce_sandbox.current_opt_ins c ON c.subject_id=b.subject_id AND c.purpose='creator_research'
  JOIN commerce_sandbox.assistance_facts f ON f.subject_id=b.subject_id AND f.source_sha=b.source_sha
  WHERE f.kind='requested_compatibility' AND f.expires_at>CURRENT_TIMESTAMP;
  IF people < minimum_people THEN RETURN '{"status":"insufficient_evidence"}'; END IF;
  RETURN jsonb_build_object('status','available','kind','requested_compatibility',
    'product','aurora-ui-kit','edition','essential','atLeastPeople',(people / minimum_people) * minimum_people);
END $$;

REVOKE ALL ON FUNCTION public.glass_assistance_v1(text,text,text),
  public.glass_creator_opportunities_v1(text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.glass_assistance_v1(text,text,text),
  public.glass_creator_opportunities_v1(text,text) TO service_role;
COMMIT;
