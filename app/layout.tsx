import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/src/components/ui/theme-provider'
import { Providers } from './providers'
import './globals.css'

const manrope = localFont({
  src: './fonts/Manrope.ttf',
  variable: '--font-manrope',
  weight: '200 800',
  display: 'swap',
})

const inter = localFont({
  src: './fonts/Inter.ttf',
  variable: '--font-inter',
  weight: '400 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'American Glass',
  description: 'American Glass. Muy pronto, nuestro nuevo sitio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
