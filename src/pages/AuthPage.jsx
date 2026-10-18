import { useEffect, useState } from 'react'
import { Link, navigate } from '../router.jsx'
import { logIn, signUp, useSession, signInWithGoogle } from '../lib/auth.js'
import { hasSupabase } from '../lib/supabase.js'
import { Icons, Leaf } from '../components/Doodles.jsx'
import './AuthPage.css'

function GoogleIcon() {
  return (
    <svg className="auth__google-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
      />
    </svg>
  )
}

function AuthDoodle() {
  return (
    <svg className="auth__art" viewBox="0 0 320 260" aria-hidden="true">
      <path d="M50 100c20-60 110-90 180-70s90 80 70 140-60 80-140 80S30 180 50 100Z" fill="#e2f4d8" />
      <ellipse cx="160" cy="236" rx="110" ry="9" fill="#c6ebb2" />
      <g transform="translate(110 60)">
        <rect width="100" height="170" rx="18" fill="#2f3b34" />
        <rect x="8" y="12" width="84" height="148" rx="12" fill="#eef8e8" />
        <circle cx="50" cy="56" r="20" fill="#1e9e57" />
        <circle cx="50" cy="50" r="8" fill="#fff" />
        <path d="M36 70c4-10 24-10 28 0" fill="#fff" />
        <rect x="22" y="92" width="56" height="10" rx="5" fill="#dfeadb" />
        <rect x="22" y="110" width="56" height="10" rx="5" fill="#dfeadb" />
        <rect x="22" y="130" width="56" height="14" rx="7" fill="#1e9e57" className="auth__btn" />
      </g>
      <g transform="translate(236 70)"><g className="auth__lock">
        <rect x="-18" y="0" width="36" height="30" rx="7" fill="#f6b92b" />
        <path d="M-10 0v-8a10 10 0 0 1 20 0v8" fill="none" stroke="#f6b92b" strokeWidth="5" />
        <circle cy="14" r="4" fill="#fff" />
      </g></g>
      <g className="auth__leaf"><path d="M70 70c0-20 14-30 34-30 0 20-14 30-34 30Z" fill="#6fcf4e" /></g>
    </svg>
  )
}

export default function AuthPage({ mode: initial = 'login' }) {
  const session = useSession()
  const [mode, setMode] = useState(initial)
  const [form, setForm] = useState({ name: '', email: '', password: '', referralCode: '' })
  const [status, setStatus] = useState('idle') // idle | busy | confirm
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => setMode(initial), [initial])
  useEffect(() => {
    document.title = `${mode === 'signup' ? 'Sign up' : 'Log in'} · Cirql`
    return () => {
      document.title = 'Cirql · Sell & Recycle Your Old Electronics'
    }
  }, [mode])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const switchTo = (m) => {
    setMode(m)
    setError('')
    setStatus('idle')
    setGoogleLoading(false)
    window.history.replaceState({}, '', m === 'signup' ? '/signup' : '/login')
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      setGoogleLoading(false)
      setError(err.message || 'Failed to initialize Google sign-in. Please try again.')
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (mode === 'signup' && form.name.trim().length < 2) return setError('Please enter your name.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) return setError('Please enter a valid email address.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setStatus('busy')
    try {
      if (mode === 'signup') {
        const { needsConfirmation } = await signUp({ name: form.name.trim(), email: form.email.trim(), password: form.password })
        if (needsConfirmation) return setStatus('confirm')
      } else {
        await logIn({ email: form.email.trim(), password: form.password })
      }

      let target = '/'
      try {
        const stored = sessionStorage.getItem('cirql:auth_redirect')
        if (stored && stored.startsWith('/') && !stored.startsWith('/login') && !stored.startsWith('/signup') && !stored.startsWith('/auth')) {
          sessionStorage.removeItem('cirql:auth_redirect')
          target = stored
        }
      } catch {
        /* storage blocked */
      }
      navigate(target)
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <main className="auth">
      <Leaf className="auth__deco" size={60} rotate={-25} />
      <div className="auth__card">
        <div className="auth__side">
          <AuthDoodle />
          <h2>{mode === 'signup' ? 'Join the recycling movement' : 'Welcome back'}</h2>
          <p>Track your pickups, earnings and EcoPoints in one place.</p>
        </div>

        <div className="auth__main">
          {session ? (
            <div className="auth__done">
              <span className="auth__done-icon"><Icons.check width="34" height="34" /></span>
              <h1>You’re logged in</h1>
              <p>Signed in as {session.user.email}</p>
              <Link className="btn btn--primary" to="/">Go to home</Link>
            </div>
          ) : status === 'confirm' ? (
            <div className="auth__done">
              <span className="auth__done-icon"><Icons.send width="30" height="30" /></span>
              <h1>Check your inbox</h1>
              <p>We sent a confirmation link to <strong>{form.email}</strong>. Click it, then log in.</p>
              <button type="button" className="btn btn--ghost" onClick={() => switchTo('login')}>Go to log in</button>
            </div>
          ) : (
            <>
              <div className="auth__tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'login'}
                  className={mode === 'login' ? 'is-on' : ''}
                  onClick={() => switchTo('login')}
                >
                  Log in
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'signup'}
                  className={mode === 'signup' ? 'is-on' : ''}
                  onClick={() => switchTo('signup')}
                >
                  Sign up
                </button>
              </div>

              <h1>{mode === 'signup' ? 'Create your account' : 'Log in to Cirql'}</h1>

              {/* Google OAuth Button */}
              <button
                type="button"
                className="btn btn--google"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || status === 'busy' || !hasSupabase}
                aria-label="Continue with Google"
              >
                {googleLoading ? (
                  <span className="auth__spinner" aria-hidden="true" />
                ) : (
                  <GoogleIcon />
                )}
                <span>{googleLoading ? 'Connecting to Google…' : 'Continue with Google'}</span>
              </button>

              <div className="auth__divider" role="separator">
                <span>or continue with email</span>
              </div>

              <form className="auth__form" onSubmit={submit} noValidate key={mode}>
                {mode === 'signup' && (
                  <label>
                    <span>Full name</span>
                    <input
                      value={form.name}
                      onChange={set('name')}
                      autoComplete="name"
                      maxLength={120}
                      placeholder="e.g. Alex Sharma"
                    />
                  </label>
                )}
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                    maxLength={200}
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={set('password')}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    minLength={6}
                    maxLength={72}
                    placeholder="At least 6 characters"
                  />
                </label>
                {mode === 'signup' && (
                  <label>
                    <span>Referral code (optional)</span>
                    <input
                      value={form.referralCode}
                      onChange={set('referralCode')}
                      autoComplete="off"
                      maxLength={40}
                      placeholder="e.g. CIRQL-A1B2"
                    />
                  </label>
                )}
                {error && <p className="auth__error" role="alert">{error}</p>}
                <button
                  type="submit"
                  className="btn btn--primary auth__submit"
                  disabled={status === 'busy' || googleLoading || !hasSupabase}
                >
                  {status === 'busy' ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
                </button>
              </form>

              <p className="auth__switch">
                {mode === 'signup' ? 'Already have an account? ' : 'New to Cirql? '}
                <button type="button" onClick={() => switchTo(mode === 'signup' ? 'login' : 'signup')}>
                  {mode === 'signup' ? 'Log in' : 'Create an account'}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
