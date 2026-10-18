/*
 * Unified Supabase Auth client for email/password and Google OAuth.
 * Session state is synchronized between the Supabase SDK and localStorage.
 */
import { useSyncExternalStore } from 'react'
import { supabase } from './supabase.js'
import { signInWithGoogle as googleSignIn } from './googleAuth.js'

const STORE = 'cirql:session'
const listeners = new Set()

export function formatSession(s) {
  if (!s?.access_token) return null
  const u = s.user || {}
  const meta = u.user_metadata || {}
  return {
    ...s,
    access_token: s.access_token,
    refresh_token: s.refresh_token,
    expires_at: s.expires_at || Math.floor(Date.now() / 1000) + (s.expires_in || 3600),
    user: {
      ...u,
      id: u.id,
      email: u.email,
      name: meta.full_name || meta.name || '',
      user_metadata: meta,
    },
  }
}

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || null
  } catch {
    return null
  }
}

let session = read()

export function saveSession(s) {
  session = s
  try {
    if (s) localStorage.setItem(STORE, JSON.stringify(s))
    else localStorage.removeItem(STORE)
  } catch {
    /* storage blocked: session lasts for this tab only */
  }
  listeners.forEach((fn) => fn())
}

function friendly(data) {
  const msg = data?.message || data?.msg || data?.error_description || data?.error || (typeof data === 'string' ? data : '')
  if (/invalid login credentials/i.test(msg)) return 'Wrong email or password.'
  if (/email not confirmed/i.test(msg)) return 'Please confirm your email first. Check your inbox for the link.'
  if (/already registered|already been registered/i.test(msg)) return 'An account with this email already exists. Try logging in.'
  if (/password should be at least/i.test(msg)) return 'Password must be at least 6 characters.'
  if (/rate limit|too many/i.test(msg)) return 'Too many attempts. Please wait a minute and try again.'
  return msg || 'Something went wrong. Please try again.'
}

/** Returns { needsConfirmation } when the project requires email confirmation. */
export async function signUp({ name, email, password }) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const redirect = `${window.location.origin}/login`
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: redirect,
    },
  })
  if (error) throw new Error(friendly(error))
  const s = formatSession(data.session)
  if (s) saveSession(s)
  return { needsConfirmation: !data.session }
}

export async function logIn({ email, password }) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(friendly(error))
  const s = formatSession(data.session)
  if (s) saveSession(s)
  return s
}

export async function logOut() {
  saveSession(null)
  if (supabase) {
    await supabase.auth.signOut().catch(() => {})
  }
}

export const signInWithGoogle = googleSignIn

// Synchronize session reactively with Supabase SDK
if (typeof window !== 'undefined' && supabase) {
  supabase.auth.getSession().then(({ data: { session: s } }) => {
    if (s) {
      saveSession(formatSession(s))
    }
  }).catch(() => {})

  supabase.auth.onAuthStateChange((event, s) => {
    if (event === 'SIGNED_OUT') {
      saveSession(null)
    } else if (s) {
      saveSession(formatSession(s))
    }
  })
}

const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const useSession = () => useSyncExternalStore(subscribe, () => session)
