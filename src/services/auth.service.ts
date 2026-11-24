import { apiRequest } from '@/src/lib/api-client'
import type { AuthUser, LoginRequest, LoginResponse } from '@/src/types/api/auth'

export const authService = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiRequest<LoginResponse>('/auth/login', { method: 'POST', body: data }),

  me: (token: string): Promise<AuthUser> => apiRequest<AuthUser>('/auth/me', { token }),
}
