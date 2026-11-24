import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { authService } from '@/src/services/auth.service'
import type { LoginRequest } from '@/src/types/api/auth'
import { useAuth } from '../context/auth-context'

export function useLogin() {
  const { login } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: ({ accessToken, user }) => {
      login(accessToken)
      // The login already returns the user: no need to ask /auth/me again.
      queryClient.setQueryData(QUERY_KEYS.auth.me, user)
    },
  })
}
