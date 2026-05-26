-- Assets Performance tables for Atom Buyers Club
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS assets (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now(),
  address               text NOT NULL,
  postal_code           text,
  arrondissement        text,
  nickname              text,
  segment               text NOT NULL CHECK (segment IN ('atom', 'other', 'monitoring')),
  sci_name              text,
  client_name           text,
  surface               numeric,
  bedrooms              int,
  capacity              int,
  floor                 int,
  has_elevator          boolean,
  monthly_rent          numeric,
  date_lease_start      date,
  date_lease_end        date,
  acquisition_price     numeric,
  total_all_in          numeric,
  purchase_date         date,
  distribution_channels text[],
  property_manager_id   uuid,
  status                text DEFAULT 'active' CHECK (status IN ('active', 'onboarding', 'paused', 'archived')),
  launch_date           date,
  photos                text[],
  notes                 text
);

CREATE TABLE IF NOT EXISTS asset_monthly_performance (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id              uuid REFERENCES assets(id) ON DELETE CASCADE,
  month                 date NOT NULL,
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now(),
  updated_by            text,
  gross_revenue         numeric DEFAULT 0,
  revenue_breakdown     jsonb,
  cleaning_cost         numeric DEFAULT 0,
  diamoni_fees          numeric DEFAULT 0,
  other_platform_fees   numeric DEFAULT 0,
  management_fees       numeric DEFAULT 0,
  edf                   numeric DEFAULT 0,
  syndic                numeric DEFAULT 0,
  internet              numeric DEFAULT 0,
  property_tax          numeric DEFAULT 0,
  insurance             numeric DEFAULT 0,
  other_charges         numeric DEFAULT 0,
  nights_booked         int DEFAULT 0,
  nights_available      int,
  total_stays           int DEFAULT 0,
  adr                   numeric,
  revpar                numeric,
  occupancy_rate        numeric,
  avg_stay_length       numeric,
  operating_profit      numeric,
  net_revenue_atom      numeric,
  sci_net_revenue       numeric,
  status                text DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'validated')),
  notes                 text,
  UNIQUE(asset_id, month)
);

CREATE TABLE IF NOT EXISTS manual_bookings (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id              uuid REFERENCES assets(id),
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now(),
  created_by            text,
  source                text NOT NULL CHECK (source IN ('la_fourche', 'pretto', 'nopillo', 'direct', 'corporate', 'other')),
  guest_name            text NOT NULL,
  guest_contact         text,
  check_in              date NOT NULL,
  check_out             date NOT NULL,
  nights                int,
  gross_amount          numeric NOT NULL,
  cleaning_included     boolean DEFAULT true,
  booking_reference     text,
  status                text DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),
  integrated_in_monthly boolean DEFAULT false,
  integrated_month      date,
  notes                 text
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_asset_monthly_asset_id ON asset_monthly_performance(asset_id);
CREATE INDEX IF NOT EXISTS idx_asset_monthly_month ON asset_monthly_performance(month DESC);
CREATE INDEX IF NOT EXISTS idx_manual_bookings_asset_id ON manual_bookings(asset_id);
CREATE INDEX IF NOT EXISTS idx_assets_segment ON assets(segment);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
