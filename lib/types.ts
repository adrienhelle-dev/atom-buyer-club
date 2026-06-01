export interface Asset {
  id: string
  created_at: string
  updated_at: string
  address: string
  postal_code?: string
  arrondissement?: string
  nickname?: string
  segment: 'atom' | 'other' | 'monitoring'
  sci_name?: string
  client_name?: string
  surface?: number
  bedrooms?: number
  capacity?: number
  floor?: number
  has_elevator?: boolean
  monthly_rent?: number
  date_lease_start?: string
  date_lease_end?: string
  acquisition_price?: number
  total_all_in?: number
  purchase_date?: string
  distribution_channels?: string[]
  property_manager_id?: string
  status: 'active' | 'onboarding' | 'paused' | 'archived'
  launch_date?: string
  photos?: string[]
  notes?: string
  // Pont CRM : réalisation (showroom_item) dont cet asset est issu. Null si non lié.
  showroom_item_id?: string | null
}

// Réalisation côté CRM (table showroom_items, base partagée) — version allégée
// pour le sélecteur "Réalisation liée" de la fiche asset.
export interface RealisationOption {
  id: string
  name: string
  slug?: string
  arrondissement?: string
  statut_location?: string
}

export interface AssetMonthlyPerformance {
  id?: string
  asset_id: string
  month: string
  created_at?: string
  updated_at?: string
  updated_by?: string
  gross_revenue: number
  revenue_breakdown?: Record<string, number>
  cleaning_cost: number
  diamoni_fees: number
  other_platform_fees: number
  management_fees: number
  edf: number
  syndic: number
  internet: number
  property_tax: number
  insurance: number
  other_charges: number
  nights_booked: number
  nights_available: number
  total_stays: number
  adr?: number
  revpar?: number
  occupancy_rate?: number
  avg_stay_length?: number
  operating_profit?: number
  net_revenue_atom?: number
  sci_net_revenue?: number
  status: 'draft' | 'submitted' | 'validated'
  notes?: string
}

export interface ManualBooking {
  id?: string
  asset_id: string
  created_at?: string
  created_by?: string
  source: 'la_fourche' | 'pretto' | 'nopillo' | 'direct' | 'corporate' | 'other'
  guest_name: string
  guest_contact?: string
  check_in: string
  check_out: string
  nights?: number
  gross_amount: number
  cleaning_included: boolean
  booking_reference?: string
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show'
  integrated_in_monthly: boolean
  integrated_month?: string
  notes?: string
}

export function computePnL(perf: AssetMonthlyPerformance, asset: Pick<Asset, 'segment' | 'monthly_rent'>) {
  const { gross_revenue, cleaning_cost, diamoni_fees, other_platform_fees, management_fees,
    edf, syndic, internet, property_tax, insurance, other_charges,
    nights_booked, nights_available, total_stays } = perf

  const operatingProfit = gross_revenue - cleaning_cost - diamoni_fees - other_platform_fees
    - (asset.segment === 'monitoring' ? management_fees : 0)

  const atomNetRevenue = asset.segment !== 'monitoring'
    ? operatingProfit - (asset.monthly_rent ?? 0)
    : null

  const chargesTotal = edf + syndic + internet + property_tax + insurance + other_charges
  const sciNetRevenue = atomNetRevenue !== null ? atomNetRevenue - chargesTotal : null

  const occupancyRate = nights_available > 0 ? (nights_booked / nights_available) * 100 : 0
  const adr = nights_booked > 0 ? gross_revenue / nights_booked : 0
  const revpar = nights_available > 0 ? gross_revenue / nights_available : 0
  const avgStayLength = total_stays > 0 ? nights_booked / total_stays : 0

  return { operatingProfit, atomNetRevenue, sciNetRevenue, occupancyRate, adr, revpar, avgStayLength, chargesTotal }
}
