import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { authService } from '@/src/services/auth.service'
import { useAuth } from '../context/auth-context'

export function useCurrentUser() {
  const { token } = useAuth()

  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: () => authService.me(token as string),
    enabled: !!token,
  })
}
