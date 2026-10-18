import { supabase, hasSupabase } from './supabase'

export async function signInWithGoogle() {
  if (!hasSupabase || !supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables.')
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'online',
        prompt: 'select_account',
      },
    },
  })

  if (error) {
    console.error('Google sign-in failed:', error.message)
    throw error
  }

  return data
}

export async function signOut() {
  if (!supabase) return
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}
