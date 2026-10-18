import { useEffect, useState, useRef } from 'react'
import { navigate } from '../router.jsx'
import { supabase, hasSupabase } from '../lib/supabase.js'
import { formatSession, saveSession } from '../lib/auth.js'
import { Icons, Leaf } from '../components/Doodles.jsx'
import './AuthPage.css'

export default function AuthCallback() {
  const [status, setStatus] = useState('processing') // 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const processedRef = useRef(false)

  useEffect(() => {
    if (processedRef.current) return
    processedRef.current = true

    let active = true

    async function finishSignIn() {
      if (!hasSupabase || !supabase) {
        if (!active) return
        setStatus('error')
        setErrorMessage('Authentication service is not configured.')
        return
      }

      // Check URL search parameters or hash fragment for errors from Google / Supabase
      const searchParams = new URLSearchParams(window.location.search)
      const hashString = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : ''
      const hashParams = new URLSearchParams(hashString)

      const error = searchParams.get('error') || hashParams.get('error')
      const errorDescription = searchParams.get('error_description') || hashParams.get('error_description')
      if (error) {
        if (!active) return
        setStatus('error')
        setErrorMessage(errorDescription || error || 'Google sign-in was cancelled or failed.')
        return
      }

      const code = searchParams.get('code')

      try {
        let session = null

        // If authorization code is present (PKCE flow), exchange it for a session
        if (code) {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          if (exchangeError) {
            // Check if Supabase auto-detection already resolved the session
            const { data: current } = await supabase.auth.getSession()
            if (current?.session) {
              session = current.session
            } else {
              throw exchangeError
            }
          } else {
            session = data?.session
          }
        } else {
          // If implicit flow or code already consumed, check current session
          const { data, error: sessionError } = await supabase.auth.getSession()
          if (sessionError) throw sessionError
          session = data?.session
        }

        // Wait briefly if session is still settling
        if (!session) {
          session = await new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(null), 3500)
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
              if (s) {
                clearTimeout(timeout)
                subscription?.unsubscribe()
                resolve(s)
              }
            })
          })
        }

        if (!active) return

        if (!session) {
          setStatus('error')
          setErrorMessage('Could not establish an authenticated session. Please try logging in again.')
          return
        }

        // Synchronize with Cirql unified session store
        const formatted = formatSession(session)
        saveSession(formatted)

        setStatus('success')

        // Determine destination: check if user had a pending protected route target
        let target = '/'
        try {
          const stored = sessionStorage.getItem('cirql:auth_redirect')
          if (stored && stored.startsWith('/') && !stored.startsWith('/login') && !stored.startsWith('/signup') && !stored.startsWith('/auth')) {
            sessionStorage.removeItem('cirql:auth_redirect')
            target = stored
          }
        } catch {
          // Fall back to home
        }

        // Replace history state to clean the OAuth code from URL and navigate to target
        window.history.replaceState({}, '', target)
        navigate(target)
      } catch (err) {
        if (!active) return
        console.error('OAuth callback error:', err)
        setStatus('error')
        setErrorMessage(err.message || 'An unexpected error occurred during sign-in.')
      }
    }

    finishSignIn()

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="auth">
      <Leaf className="auth__deco" size={60} rotate={-25} />
      <div className="auth__card auth__card--callback">
        <div className="auth__main" style={{ textAlign: 'center', padding: '48px 32px' }}>
          {status === 'processing' && (
            <div className="auth__callback-state">
              <span className="auth__spinner-large" aria-hidden="true" />
              <h2>Completing sign-in…</h2>
              <p>Please wait while we securely log you in with Google.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="auth__callback-state">
              <span className="auth__done-icon" style={{ margin: '0 auto 16px' }}>
                <Icons.check width="34" height="34" />
              </span>
              <h2>Authenticated!</h2>
              <p>Taking you to Cirql…</p>
            </div>
          )}

          {status === 'error' && (
            <div className="auth__callback-state">
              <div className="auth__error-icon">!</div>
              <h2>Sign-in failed</h2>
              <p className="auth__error" style={{ margin: '0 auto 24px', maxWidth: '360px' }}>
                {errorMessage}
              </p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => navigate('/login')}
                style={{ cursor: 'pointer' }}
              >
                Back to log in
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
