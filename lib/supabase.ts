import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_KEY
    if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_KEY manquants')
    _client = createClient(url, key)
  }
  return _client
}

// Alias for backward-compat with api routes that import `supabase` directly
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
