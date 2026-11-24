// The admin session token lives in a cookie (not localStorage) so proxy.ts can
// check it on every /admin request before the page renders.
export const ADMIN_TOKEN_COOKIE = 'admin_token'

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export function getAdminToken(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${ADMIN_TOKEN_COOKIE}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function saveAdminToken(token: string): void {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ADMIN_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`
}

export function clearAdminToken(): void {
  document.cookie = `${ADMIN_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`
}
