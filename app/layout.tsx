import './globals.css'
import type { Metadata } from 'next'
import { Caveat, Inter } from 'next/font/google'
import { ThemeProvider } from './component/ThemeProvider'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from './component/Navbar'
import { BackgroundEffect } from './component/BackgroundEffect'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'YouClipper - Clip What Counts',
  description: 'Create and share YouTube clips by selecting start and end times.',
  metadataBase: new URL('https://youclipper.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${caveat.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main className="relative min-h-screen overflow-hidden">
            <BackgroundEffect />
            <div className="relative z-10">
              <Navbar />
              <div className="container mx-auto px-4 py-8">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}