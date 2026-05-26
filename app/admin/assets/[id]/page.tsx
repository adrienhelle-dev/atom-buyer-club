import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Asset, AssetMonthlyPerformance } from '@/lib/types'
import AssetDetailClient from './AssetDetailClient'

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [assetRes, monthlyRes] = await Promise.all([
    supabase.from('assets').select('*').eq('id', id).single(),
    supabase.from('asset_monthly_performance')
      .select('*')
      .eq('asset_id', id)
      .order('month', { ascending: false })
      .limit(24),
  ])

  if (assetRes.error || !assetRes.data) notFound()

  return (
    <AssetDetailClient
      asset={assetRes.data as Asset}
      monthly={(monthlyRes.data ?? []) as AssetMonthlyPerformance[]}
    />
  )
}
