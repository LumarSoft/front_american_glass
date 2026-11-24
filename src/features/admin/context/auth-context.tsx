'use client'

import { createContext, useContext, useEffect, useEffectEvent, useSyncExternalStore, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { clearAdminToken, getAdminToken, saveAdminToken } from '@/src/lib/admin-token'
import { onUnauthorized } from '@/src/lib/api-client'

const listeners = new Set<() => void>()

// Cookies fire no change event: re-read the token when the tab gets focus, in
// case the session changed in another tab.
function subscribeToken(listener: () => void): () => void {
  listeners.add(listener)
  window.addEventListener('focus', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('focus', listener)
  }
}

function setStoredToken(token: string | null): void {
  if (token) saveAdminToken(token)
  else clearAdminToken()
  listeners.forEach(listener => listener())
}

// Returns false during SSR and first hydration render, true afterwards — lets the
// guard wait until the client has read the cookie before deciding to redirect.
const subscribeMounted = () => () => {}

interface AuthContextValue {
  token: string | null
  isAuthenticated: boolean
  hydrated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(
    subscribeMounted,
    () => true,
    () => false,
  )
  const storedToken = useSyncExternalStore(subscribeToken, getAdminToken, () => null)
  const token = hydrated ? storedToken : null
  const queryClient = useQueryClient()

  // Cached queries are not keyed by user: a new session must never start from
  // what the previous one loaded.
  const switchSession = (newToken: string | null) => {
    queryClient.clear()
    setStoredToken(newToken)
  }

  const expireSession = useEffectEvent((rejected: string) => {
    if (rejected !== getAdminToken()) return
    toast.info('Tu sesión venció. Volvé a ingresar.')
    switchSession(null)
  })

  // An expired or revoked token gets a 401 on every call: end the session so the
  // panel goes back to the login instead of staying half-loaded.
  useEffect(() => onUnauthorized(rejected => expireSession(rejected)), [])

  const value: AuthContextValue = {
    token,
    isAuthenticated: !!token,
    hydrated,
    login: (newToken: string) => switchSession(newToken),
    logout: () => switchSession(null),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
