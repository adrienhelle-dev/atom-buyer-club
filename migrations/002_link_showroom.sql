-- ────────────────────────────────────────────────────────────────────────────
-- Pont de données : asset  ⇄  réalisation (showroom_item) du CRM
-- Run in Supabase SQL Editor (même base que le CRM atom-buyer-club-landing)
--
-- Un "asset" = une réalisation qui finit par être louée. On relie donc chaque
-- asset à son showroom_item d'origine. Cela reconstitue toute la chaîne :
--
--   lead ─(lead_events: showroom_interest, slug)─▶ showroom_items ─▶ assets
--   lead ─(lead_events: interet_projet)─▶ projects ─(project_showroom_links)─▶ showroom_items ─▶ assets
--
-- ON DELETE SET NULL : supprimer une réalisation côté CRM ne détruit pas l'asset
-- (les perfs mensuelles restent), le lien est juste vidé.
-- ────────────────────────────────────────────────────────────────────────────

ALTER TABLE assets
  ADD COLUMN IF NOT EXISTS showroom_item_id uuid
    REFERENCES showroom_items(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS assets_showroom_item_id_idx
  ON assets(showroom_item_id);

-- Confort d'écriture : un même showroom_item ne devrait correspondre qu'à un seul
-- asset actif. On ne pose PAS de contrainte UNIQUE stricte (un bien peut être
-- archivé puis ré-ouvert), mais l'index ci-dessus suffit aux lookups.


-- ────────────────────────────────────────────────────────────────────────────
-- Issue du deal sur le lead — comment la conversion s'est faite quand status='signe'
--
--   managed     → géré par Atom (sourcing + travaux + gestion) → devient un asset
--   commission  → vente simple via Microsurfaces SAS, commission one-shot (déf. 8900€)
--                 → ne devient PAS un asset
--
-- Champs nullables : ils ne portent un sens que pour un lead 'signe'.
-- ────────────────────────────────────────────────────────────────────────────

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS deal_outcome text
    CHECK (deal_outcome IN ('managed', 'commission')),
  ADD COLUMN IF NOT EXISTS commission_amount numeric,
  ADD COLUMN IF NOT EXISTS deal_closed_at timestamptz;

CREATE INDEX IF NOT EXISTS leads_deal_outcome_idx ON leads(deal_outcome);
