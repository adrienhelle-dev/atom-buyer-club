import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { computePnL } from '@/lib/types'
import type { AssetMonthlyPerformance } from '@/lib/types'

async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('atom_admin_token')?.value
  return token ? verifyToken(token) : null
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const { data, error } = await supabase
    .from('asset_monthly_performance')
    .select('*')
    .eq('asset_id', id)
    .order('month', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user || user.role === 'viewer') return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const body = await req.json() as AssetMonthlyPerformance

  // Fetch asset for P&L computation
  const { data: asset } = await supabase
    .from('assets')
    .select('segment, monthly_rent')
    .eq('id', id)
    .single()

  if (!asset) return NextResponse.json({ error: 'Asset introuvable' }, { status: 404 })

  const computed = computePnL(body, asset)

  const record = {
    ...body,
    asset_id: id,
    updated_by: user.email,
    updated_at: new Date().toISOString(),
    adr: computed.adr,
    revpar: computed.revpar,
    occupancy_rate: computed.occupancyRate,
    avg_stay_length: computed.avgStayLength,
    operating_profit: computed.operatingProfit,
    net_revenue_atom: computed.atomNetRevenue,
    sci_net_revenue: computed.sciNetRevenue,
  }

  const { data, error } = await supabase
    .from('asset_monthly_performance')
    .upsert(record, { onConflict: 'asset_id,month' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
