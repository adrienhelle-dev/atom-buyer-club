import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import type { Asset, AssetMonthlyPerformance } from '@/lib/types'
import AssetDetailClient from './AssetDetailClient'

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Role check
  const cookieStore = await cookies()
  const token = cookieStore.get('atom_admin_token')?.value
  const currentUser = token ? verifyToken(token) : null
  const canWrite = currentUser?.role !== 'viewer'

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
      canWrite={canWrite}
    />
  )
}
