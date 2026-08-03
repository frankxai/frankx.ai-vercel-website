/**
 * data/ecosystems.ts
 * 
 * TypeScript interfaces and schema definitions for the Founder Ecosystems city guides.
 */

export interface Space {
  name: string;
  address: string;
  model: string; // e.g. "Free", "Hourly", "Member", "Club"
  notes: string;
  price: string;
  district: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Candidate {
  name: string;
  ai_deeptech_fit: number;
  music_creative_fit: number;
  cost_efficiency: number;
  free_low_commitment: number;
  events_density: number;
  global_travel_value: number;
  enterprise_credibility: number;
  total: number;
  tier: string;
  note?: string;
  trigger?: string;
}

export interface DecisionMatrix {
  scale: string;
  weights: Record<string, number>;
  max_score: number;
  candidates: Candidate[];
}

export interface UvaClusterEntry {
  name: string;
  type: string;
  price_eur_month?: number;
  price_eur_month_from?: number;
  min_commitment?: string;
  capacity?: string;
  focus?: string;
  notes: string;
  source: string;
  operator?: string;
}

export interface DLabLocation {
  campus: string;
  address: string;
}

export interface DLabStage {
  duration: string;
  focus: string;
}

export interface DLabTrackRecord {
  active_projects_at_a_time: number;
  pct_become_bv: number;
  notes: string;
}

export interface DLabEvent {
  name: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  open_to_non_affiliates: boolean;
}

export interface DemonstratorLab {
  what: string;
  eligibility_gate: string;
  locations: DLabLocation[];
  application_process: string[];
  stages: Record<string, DLabStage>;
  track_record: DLabTrackRecord;
  cost: string;
  not_a_workspace_choice: string;
  recruiting_playbook_for_qualifying_teammate: string[];
  open_question: string;
  upcoming_event: DLabEvent;
  sources: string[];
}

export interface AdamVenue {
  name: string;
  type: string;
  floor?: number;
  location?: string;
}

export interface AdamCoworking {
  operator: string;
  flex_desk_eur_month: number;
  flex_min_commitment: string;
  dedicated_desk_eur_month: number;
  dedicated_min_commitment: string;
  includes: string[];
  source: string;
}

export interface AdamTenant {
  name: string;
  status: string;
  focus: string;
  collab_angle: string;
}

export interface AdamToren {
  public_venues_no_membership_needed: AdamVenue[];
  coworking_membership: AdamCoworking;
  confirmed_tenants: AdamTenant[];
}

export interface FreeCircuitEntry {
  name: string;
  address?: string;
  cost: string;
  hours?: string;
  notes?: string;
}

export interface EventRailEntry {
  name: string;
  cadence?: string;
  dates?: string;
  notes?: string;
  venue?: string;
  capacity?: number;
  attendance?: string;
}

export interface EcosystemData {
  city: string;
  country: string;
  generated: string;
  source_register: string;
  doctrine: string;
  decision_matrix: DecisionMatrix;
  recommended_tiers: Record<string, string[]>;
  uva_science_park_cluster: UvaClusterEntry[];
  demonstrator_lab: DemonstratorLab;
  adam_toren: AdamToren;
  free_circuit: FreeCircuitEntry[];
  events_rail: EventRailEntry[];
  spaces: Space[];
}
