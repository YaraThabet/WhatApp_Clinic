import { createClient } from '@supabase/supabase-js'

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Please check your .env.local file.')
}

/**
 * Public Supabase Client
 * To be used on the frontend and for non-admin operations.
 * Permissions are limited by Row Level Security (RLS) policies.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Admin Supabase Client
 * To be used ONLY on the backend (API routes, server actions).
 * Bypasses Row Level Security (RLS). 
 * DO NOT expose SUPABASE_SERVICE_ROLE_KEY to the client side.
 */
export const supabaseAdmin = typeof window === 'undefined'
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null

/*
=========================================
EXAMPLE USAGE: FRONTEND (Client Components)
=========================================

import { supabase } from '@/lib/supabase'

async function fetchData() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  
  if (error) console.error(error)
  return data
}

=========================================
EXAMPLE USAGE: BACKEND (API Routes / Server Actions)
=========================================

import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req) {
  if (!supabaseAdmin) {
    return new Response('Admin client not available', { status: 500 })
  }

  // Bypasses RLS - use with caution!
  const { data, error } = await supabaseAdmin
    .from('users_audit')
    .insert({ action: 'login', user_id: '...' })

  return Response.json({ success: true })
}
*/
