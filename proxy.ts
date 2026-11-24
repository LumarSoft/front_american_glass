import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_TOKEN_COOKIE } from '@/src/lib/admin-token'

const PROTECTED_PREFIX = '/admin'
const LOGIN_PATH = '/admin/login'
const HOME_PATH = '/admin'

function getTokenExp(token: string): number | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64)) as { exp?: number }
    return typeof payload.exp === 'number' ? payload.exp : null
  } catch {
    return null
  }
}

// An optimistic check only: the API still validates the token on every call.
function hasUsableToken(token: string | undefined): boolean {
  if (!token) return false
  const exp = getTokenExp(token)
  return exp === null || Date.now() < exp * 1000
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value
  const authenticated = hasUsableToken(token)

  const isAdminRoute = pathname === PROTECTED_PREFIX || pathname.startsWith(`${PROTECTED_PREFIX}/`)
  const isLoginPage = pathname === LOGIN_PATH

  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url))
  }

  if (isAdminRoute && !isLoginPage && !authenticated) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    if (token) response.cookies.delete(ADMIN_TOKEN_COOKIE)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
