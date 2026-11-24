'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { BrandName } from '@/src/components/brand-name'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { ApiError } from '@/src/lib/api-client'
import { useAuth } from '../context/auth-context'
import { useLogin } from '../hooks/use-login'

export function LoginForm() {
  const router = useRouter()
  const { isAuthenticated, hydrated } = useAuth()
  const login = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (hydrated && isAuthenticated) router.replace('/admin')
  }, [hydrated, isAuthenticated, router])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    login.mutate(
      { email, password },
      {
        onSuccess: () => router.replace('/admin'),
        onError: error => {
          setErrorMessage(
            error instanceof ApiError && error.status === 401
              ? 'Email o contraseña incorrectos.'
              : 'No se pudo iniciar sesión. Intentá de nuevo.',
          )
        },
      },
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 px-5 py-16">
      <BrandName className="mb-8 text-2xl" />

      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle className="font-display text-xl">Iniciá sesión</CardTitle>
          <CardDescription>Ingresá al panel de administración con tu email y contraseña.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="nombre@empresa.com"
                  className="h-10 pl-9"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    setErrorMessage(null)
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="h-10 pr-10 pl-9"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    setErrorMessage(null)
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Button type="submit" disabled={login.isPending} className="mt-1 h-10 w-full">
              {login.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Ingresando…
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
