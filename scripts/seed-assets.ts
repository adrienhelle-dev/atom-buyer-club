/**
 * Seed script — importe les 15 assets et leurs performances mensuelles
 * depuis le fichier Excel "Tableau de bord des performances locatives".
 *
 * Usage: npx tsx scripts/seed-assets.ts
 * Prérequis: .env.local avec SUPABASE_URL + SUPABASE_SERVICE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import * as path from 'path'

// Node 20.12+ built-in — pas besoin de dotenv
process.loadEnvFile(path.join(process.cwd(), '.env.local'))

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// ---------------------------------------------------------------------------
// DONNÉES ASSETS
// ---------------------------------------------------------------------------

type AssetInput = {
  address: string
  postal_code: string
  arrondissement: string
  nickname: string
  segment: 'atom' | 'other' | 'monitoring'
  sci_name?: string
  client_name?: string
  monthly_rent: number
  status: 'active' | 'onboarding' | 'paused' | 'archived'
  notes?: string
}

type MonthlyInput = {
  month: string // YYYY-MM-DD (premier jour du mois)
  gross_revenue: number
  cleaning_cost: number
  diamoni_fees: number
  other_platform_fees?: number
  management_fees?: number
  edf?: number
  syndic?: number
  internet?: number
  property_tax?: number
  insurance?: number
  other_charges?: number
}

type BookingInput = {
  source: 'la_fourche' | 'pretto' | 'nopillo' | 'direct'
  guest_name: string
  guest_contact?: string
  check_in: string
  check_out: string
  gross_amount: number
  cleaning_included: boolean
  booking_reference?: string
}

type SeedAsset = AssetInput & {
  monthly: MonthlyInput[]
  bookings?: BookingInput[]
}

const ASSETS: SeedAsset[] = [
  // ─────────────────────────────────────────────────────────────
  // SEGMENT ATOM
  // ─────────────────────────────────────────────────────────────
  {
    address: '96 rue Saint Antoine',
    postal_code: '75004',
    arrondissement: '4e',
    nickname: 'Saint Antoine',
    segment: 'atom',
    sci_name: 'SCI Stamina',
    monthly_rent: 1450,
    status: 'active',
    monthly: [
      // Données EDF/Syndic/Internet/TF disponibles pour Oct→Feb uniquement
      { month: '2025-10-01', gross_revenue: 3250,    cleaning_cost: 440,  diamoni_fees: 313,    edf: 72,    syndic: 82, internet: 30, property_tax: 116 },
      { month: '2025-12-01', gross_revenue: 2998.05, cleaning_cost: 385,  diamoni_fees: 313.5,  edf: 78.28, syndic: 82, internet: 30, property_tax: 116 },
      { month: '2026-01-01', gross_revenue: 3200.48, cleaning_cost: 550,  diamoni_fees: 312.56, edf: 160.46,syndic: 82, internet: 30, property_tax: 116 },
      { month: '2026-02-01', gross_revenue: 3055.89, cleaning_cost: 440,  diamoni_fees: 248,    edf: 107.74,syndic: 82, internet: 30, property_tax: 116 },
      { month: '2026-03-01', gross_revenue: 2851.34, cleaning_cost: 440,  diamoni_fees: 263 },
      { month: '2026-04-01', gross_revenue: 3701,    cleaning_cost: 385,  diamoni_fees: 401 },
    ],
    bookings: [
      { source: 'la_fourche', guest_name: 'Arthur', guest_contact: '+49 16097523958', check_in: '2026-03-24', check_out: '2026-03-27', gross_amount: 252, cleaning_included: true, booking_reference: 'EPG.02115014698467fc90af0' },
    ],
  },
  {
    address: '12 rue Félix Ziem',
    postal_code: '75018',
    arrondissement: '18e',
    nickname: 'Ziem',
    segment: 'atom',
    sci_name: 'SCI Skak',
    monthly_rent: 1500, // loyer baisse à 1350 à partir de Feb 2026
    status: 'active',
    monthly: [
      { month: '2025-10-01', gross_revenue: 2510,    cleaning_cost: 440,  diamoni_fees: 212 },
      { month: '2025-12-01', gross_revenue: 2308.25, cleaning_cost: 495,  diamoni_fees: 217.5 },
      { month: '2026-01-01', gross_revenue: 2360.84, cleaning_cost: 440,  diamoni_fees: 225.1 },
      { month: '2026-02-01', gross_revenue: 1851.56, cleaning_cost: 275,  diamoni_fees: 188 },
      { month: '2026-03-01', gross_revenue: 1856,    cleaning_cost: 275,  diamoni_fees: 197 },
      { month: '2026-04-01', gross_revenue: 2122,    cleaning_cost: 220,  diamoni_fees: 221 },
    ],
    bookings: [
      { source: 'la_fourche', guest_name: 'Andy Egan', guest_contact: '+49 162 881 13 85', check_in: '2026-04-21', check_out: '2026-04-24', gross_amount: 252, cleaning_included: true },
    ],
  },
  {
    address: '49 Rue Richer',
    postal_code: '75009',
    arrondissement: '9e',
    nickname: 'Richer',
    segment: 'atom',
    monthly_rent: 0,
    status: 'onboarding',
    notes: 'Loyer à confirmer. Pas de revenus enregistrés à date.',
    monthly: [],
  },
  {
    address: '24 rue Beaurepaire',
    postal_code: '75010',
    arrondissement: '10e',
    nickname: 'Beaurepaire',
    segment: 'atom',
    monthly_rent: 1120,
    status: 'onboarding',
    notes: 'En phase de démarrage. Premiers séjours tests Jan-Feb 2026.',
    monthly: [
      // Revenus partiels tests + frais rénovation — non représentatifs
      { month: '2026-01-01', gross_revenue: 814.56,  cleaning_cost: 110,  diamoni_fees: 84.32 },
      { month: '2026-02-01', gross_revenue: 1721,    cleaning_cost: 440,  diamoni_fees: 182 },
    ],
    bookings: [
      { source: 'la_fourche', guest_name: 'Julia Möckel', guest_contact: '+49 171 533 46 47', check_in: '2026-03-23', check_out: '2026-03-25', gross_amount: 168, cleaning_included: true, booking_reference: 'EPG.02115015698467fc9134b' },
    ],
  },
  {
    address: '20 Rue Saint-Claude',
    postal_code: '75003',
    arrondissement: '3e',
    nickname: 'Saint Claude',
    segment: 'atom',
    monthly_rent: 1233,
    status: 'active',
    monthly: [
      { month: '2026-02-01', gross_revenue: 395.24,  cleaning_cost: 220,  diamoni_fees: 40 },
      { month: '2026-03-01', gross_revenue: 2491.94, cleaning_cost: 330,  diamoni_fees: 250 },
      { month: '2026-04-01', gross_revenue: 2065,    cleaning_cost: 385,  diamoni_fees: 245 },
    ],
    bookings: [
      { source: 'la_fourche', guest_name: 'Hannah Rieder', guest_contact: '+49 152 327 87 805', check_in: '2026-04-21', check_out: '2026-04-24', gross_amount: 252, cleaning_included: true },
    ],
  },
  {
    address: '16 rue Tiquetonne',
    postal_code: '75002',
    arrondissement: '2e',
    nickname: 'Tiquetonne',
    segment: 'atom',
    monthly_rent: 1300,
    status: 'active',
    monthly: [
      { month: '2026-02-01', gross_revenue: 347.04,  cleaning_cost: 55,   diamoni_fees: 737 },
      { month: '2026-03-01', gross_revenue: 3016.58, cleaning_cost: 385,  diamoni_fees: 298 },
      { month: '2026-04-01', gross_revenue: 3295,    cleaning_cost: 495,  diamoni_fees: 278 },
    ],
    bookings: [
      { source: 'pretto',     guest_name: 'Pierre Chapon',  check_in: '2026-04-11', check_out: '2026-04-17', gross_amount: 500, cleaning_included: true },
      { source: 'la_fourche', guest_name: 'Sophie-Charlotte Weber', guest_contact: '+49 163 384 88 39', check_in: '2026-03-23', check_out: '2026-03-27', gross_amount: 336, cleaning_included: true, booking_reference: 'EPG.02115012698467fc8fbff' },
      { source: 'la_fourche', guest_name: 'Melanie',         check_in: '2026-03-16', check_out: '2026-03-19', gross_amount: 252, cleaning_included: true },
      { source: 'la_fourche', guest_name: 'Clara',           check_in: '2026-03-10', check_out: '2026-03-12', gross_amount: 168, cleaning_included: true },
      { source: 'la_fourche', guest_name: 'Melanie Sotty',   guest_contact: '+33 672631498', check_in: '2026-05-18', check_out: '2026-05-22', gross_amount: 336, cleaning_included: true },
    ],
  },
  {
    address: '44 rue de la Jonquière',
    postal_code: '75017',
    arrondissement: '17e',
    nickname: 'Jonquière',
    segment: 'atom',
    monthly_rent: 980,
    status: 'onboarding',
    notes: "Pas encore en exploitation. Aucun revenu enregistré.",
    monthly: [],
  },
  {
    address: '5 passage des Panoramas',
    postal_code: '75002',
    arrondissement: '2e',
    nickname: 'Panoramas',
    segment: 'atom',
    monthly_rent: 955,
    status: 'active',
    monthly: [
      { month: '2026-04-01', gross_revenue: 1542, cleaning_cost: 65, diamoni_fees: 150 },
    ],
    bookings: [
      { source: 'nopillo', guest_name: 'Henri Chabrand', guest_contact: '+33 6 66 61 86 52', check_in: '2026-04-15', check_out: '2026-04-17', gross_amount: 0, cleaning_included: false },
    ],
  },
  {
    address: '53 rue Legendre',
    postal_code: '75017',
    arrondissement: '17e',
    nickname: 'Legendre',
    segment: 'atom',
    monthly_rent: 1015,
    status: 'onboarding',
    notes: "Pas encore en exploitation. Aucun revenu enregistré.",
    monthly: [],
  },

  // ─────────────────────────────────────────────────────────────
  // SEGMENT OTHER
  // ─────────────────────────────────────────────────────────────
  {
    address: '8 avenue des Gobelins',
    postal_code: '75005',
    arrondissement: '5e',
    nickname: 'Gobelins',
    segment: 'other',
    monthly_rent: 1100,
    status: 'active',
    monthly: [
      { month: '2025-12-01', gross_revenue: 1052,    cleaning_cost: 275,  diamoni_fees: 99 },
      { month: '2026-01-01', gross_revenue: 1816.16, cleaning_cost: 385,  diamoni_fees: 174.52 },
      { month: '2026-02-01', gross_revenue: 1605,    cleaning_cost: 275,  diamoni_fees: 157 },
      { month: '2026-03-01', gross_revenue: 2583.52, cleaning_cost: 275,  diamoni_fees: 158 },
      { month: '2026-04-01', gross_revenue: 2545,    cleaning_cost: 330,  diamoni_fees: 256 },
    ],
    bookings: [
      { source: 'la_fourche', guest_name: 'Clara Antunes', check_in: '2026-05-04', check_out: '2026-05-07', gross_amount: 240, cleaning_included: true },
    ],
  },
  {
    address: '19 rue Henry Monnier',
    postal_code: '75009',
    arrondissement: '9e',
    nickname: 'Monnier',
    segment: 'other',
    monthly_rent: 1000,
    status: 'active',
    notes: 'Loyer passe à 1200€ en Jan 2026.',
    monthly: [
      { month: '2026-01-01', gross_revenue: 606.35,  cleaning_cost: 110,  diamoni_fees: 58.3 },
      { month: '2026-02-01', gross_revenue: 1494,    cleaning_cost: 330,  diamoni_fees: 143 },
      { month: '2026-03-01', gross_revenue: 1716.44, cleaning_cost: 330,  diamoni_fees: 137.55 },
      { month: '2026-04-01', gross_revenue: 2764,    cleaning_cost: 440,  diamoni_fees: 304 },
    ],
    bookings: [
      { source: 'la_fourche', guest_name: 'Patrick Borbe', guest_contact: '+49 176 410 93 487', check_in: '2026-03-23', check_out: '2026-03-27', gross_amount: 336, cleaning_included: true, booking_reference: 'EP-5MAN-XCEM-S2JN' },
    ],
  },
  {
    address: '156 Avenue Daumesnil',
    postal_code: '75012',
    arrondissement: '12e',
    nickname: 'Daumesnil',
    segment: 'other',
    monthly_rent: 1000,
    status: 'active',
    monthly: [
      { month: '2026-04-01', gross_revenue: 2034, cleaning_cost: 385, diamoni_fees: 201 },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SEGMENT MONITORING
  // ─────────────────────────────────────────────────────────────
  {
    address: '89 rue Saint-Honoré',
    postal_code: '75001',
    arrondissement: '1er',
    nickname: 'Honoré',
    segment: 'monitoring',
    client_name: 'Reda',
    monthly_rent: 0,
    status: 'active',
    monthly: [
      { month: '2026-01-01', gross_revenue: 1543.36, cleaning_cost: 220,  diamoni_fees: 157.92 },
      { month: '2026-02-01', gross_revenue: 903.26,  cleaning_cost: 220,  diamoni_fees: 95 },
      { month: '2026-03-01', gross_revenue: 1444.6,  cleaning_cost: 275,  diamoni_fees: 154 },
      { month: '2026-04-01', gross_revenue: 1687,    cleaning_cost: 220,  diamoni_fees: 184 },
    ],
    bookings: [
      { source: 'la_fourche', guest_name: 'Joscha', guest_contact: '+49 176 4710 0818', check_in: '2026-03-23', check_out: '2026-03-27', gross_amount: 336, cleaning_included: true, booking_reference: 'EPG.02115013698467fc903bf' },
    ],
  },
  {
    address: '16 Rue Clouet',
    postal_code: '75015',
    arrondissement: '15e',
    nickname: 'Clouet',
    segment: 'monitoring',
    sci_name: 'SCI SMAL',
    monthly_rent: 0,
    status: 'active',
    monthly: [
      { month: '2025-10-01', gross_revenue: 1505.75, cleaning_cost: 110,  diamoni_fees: 300 },
      { month: '2025-12-01', gross_revenue: 1209,    cleaning_cost: 0,    diamoni_fees: 150 },
      { month: '2026-01-01', gross_revenue: 1025,    cleaning_cost: 55,   diamoni_fees: 150 },
      { month: '2026-02-01', gross_revenue: 1364,    cleaning_cost: 0,    diamoni_fees: 150 },
      { month: '2026-03-01', gross_revenue: 1364,    cleaning_cost: 55,   diamoni_fees: 150 },
      { month: '2026-04-01', gross_revenue: 1364,    cleaning_cost: 0,    diamoni_fees: 150 },
    ],
  },
  {
    address: '31 rue Saint Lazare',
    postal_code: '75009',
    arrondissement: '9e',
    nickname: 'Saint Lazare',
    segment: 'monitoring',
    client_name: 'Elodie Garamond (Moïra)',
    monthly_rent: 0,
    status: 'active',
    notes: 'Management contract B2C (TTC). Fees Moïra inclus dans diamoni_fees.',
    monthly: [
      // Revenus bruts TTC. management_fees = Moïra fees
      { month: '2026-01-01', gross_revenue: 1064.26, cleaning_cost: 288,    diamoni_fees: 144.64, management_fees: 96.42 },
      { month: '2026-02-01', gross_revenue: 1339.96, cleaning_cost: 192,    diamoni_fees: 186,    management_fees: 124 },
      { month: '2026-03-01', gross_revenue: 2742.58, cleaning_cost: 192,    diamoni_fees: 381.6,  management_fees: 254 },
      { month: '2026-04-01', gross_revenue: 983,     cleaning_cost: 132,    diamoni_fees: 98,     management_fees: 0 },
    ],
  },
]

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

function computePnL(
  perf: MonthlyInput,
  asset: { segment: string; monthly_rent: number }
) {
  const { gross_revenue, cleaning_cost, diamoni_fees, other_platform_fees = 0, management_fees = 0 } = perf
  const { edf = 0, syndic = 0, internet = 0, property_tax = 0, insurance = 0, other_charges = 0 } = perf

  const operatingProfit =
    gross_revenue - cleaning_cost - diamoni_fees - other_platform_fees -
    (asset.segment === 'monitoring' ? management_fees : 0)

  const atomNetRevenue =
    asset.segment !== 'monitoring'
      ? operatingProfit - (asset.monthly_rent ?? 0)
      : null

  const chargesTotal = edf + syndic + internet + property_tax + insurance + other_charges
  const sciNetRevenue = atomNetRevenue !== null ? atomNetRevenue - chargesTotal : null

  return {
    operating_profit: Math.round(operatingProfit * 100) / 100,
    net_revenue_atom: atomNetRevenue !== null ? Math.round(atomNetRevenue * 100) / 100 : null,
    sci_net_revenue: sciNetRevenue !== null ? Math.round(sciNetRevenue * 100) / 100 : null,
  }
}

function daysInMonth(monthStr: string): number {
  const d = new Date(monthStr)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

// ---------------------------------------------------------------------------
// SEED
// ---------------------------------------------------------------------------

async function main() {
  console.log('🌱 Démarrage du seed assets…\n')

  for (const asset of ASSETS) {
    const { monthly, bookings, ...assetData } = asset

    // 1. Insérer l'asset
    const { data: inserted, error: assetErr } = await supabase
      .from('assets')
      .insert({
        address: assetData.address,
        postal_code: assetData.postal_code,
        arrondissement: assetData.arrondissement,
        nickname: assetData.nickname,
        segment: assetData.segment,
        sci_name: assetData.sci_name ?? null,
        client_name: assetData.client_name ?? null,
        monthly_rent: assetData.monthly_rent,
        status: assetData.status,
        notes: assetData.notes ?? null,
      })
      .select('id, nickname')
      .single()

    if (assetErr) {
      console.error(`❌ Asset ${assetData.nickname}:`, assetErr.message)
      continue
    }

    const assetId = inserted.id
    console.log(`✅ Asset créé : ${inserted.nickname} (${assetId})`)

    // 2. Insérer les performances mensuelles
    for (const m of monthly) {
      const pnl = computePnL(m, { segment: assetData.segment, monthly_rent: assetData.monthly_rent })
      const nights_available = daysInMonth(m.month)

      const { error: perfErr } = await supabase
        .from('asset_monthly_performance')
        .insert({
          asset_id: assetId,
          month: m.month,
          gross_revenue: m.gross_revenue,
          cleaning_cost: m.cleaning_cost,
          diamoni_fees: m.diamoni_fees,
          other_platform_fees: m.other_platform_fees ?? 0,
          management_fees: m.management_fees ?? 0,
          edf: m.edf ?? 0,
          syndic: m.syndic ?? 0,
          internet: m.internet ?? 0,
          property_tax: m.property_tax ?? 0,
          insurance: m.insurance ?? 0,
          other_charges: m.other_charges ?? 0,
          nights_available,
          ...pnl,
          status: 'validated',
        })

      if (perfErr) {
        console.error(`  ❌ Perf ${m.month}:`, perfErr.message)
      } else {
        console.log(`  📅 ${m.month} — rev: ${m.gross_revenue}€, op: ${pnl.operating_profit}€`)
      }
    }

    // 3. Insérer les bookings manuels
    if (bookings?.length) {
      for (const b of bookings) {
        const nights =
          Math.round((new Date(b.check_out).getTime() - new Date(b.check_in).getTime()) / 86400000)

        const { error: bookErr } = await supabase
          .from('manual_bookings')
          .insert({
            asset_id: assetId,
            source: b.source,
            guest_name: b.guest_name,
            guest_contact: b.guest_contact ?? null,
            check_in: b.check_in,
            check_out: b.check_out,
            nights,
            gross_amount: b.gross_amount,
            cleaning_included: b.cleaning_included,
            booking_reference: b.booking_reference ?? null,
            status: 'confirmed',
          })

        if (bookErr) {
          console.error(`  ❌ Booking ${b.guest_name}:`, bookErr.message)
        } else {
          console.log(`  🛏️  Booking ${b.source} — ${b.guest_name} (${b.check_in} → ${b.check_out})`)
        }
      }
    }

    console.log()
  }

  console.log('✅ Seed terminé.')
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
