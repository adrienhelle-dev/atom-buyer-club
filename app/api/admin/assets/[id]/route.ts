import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('atom_admin_token')?.value
  return token ? verifyToken(token) : null
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  const [assetRes, perfRes] = await Promise.all([
    supabase.from('assets').select('*').eq('id', id).single(),
    supabase.from('asset_monthly_performance')
      .select('*')
      .eq('asset_id', id)
      .order('month', { ascending: false })
      .limit(24),
  ])

  if (assetRes.error) return NextResponse.json({ error: assetRes.error.message }, { status: 404 })
  return NextResponse.json({ asset: assetRes.data, monthly: perfRes.data ?? [] })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user || user.role === 'property_manager') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  const { data, error } = await supabase
    .from('assets')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user || user.role === 'property_manager') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { id } = await params
  const { error } = await supabase
    .from('assets')
    .update({ status: 'archived', updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
