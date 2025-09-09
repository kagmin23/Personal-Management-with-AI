import AuthHydrator from '@/components/providers/AuthHydrator'
import GoogleProvider from '@/components/providers/GoogleProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PerMan AI',
  description: 'Personal Management System',
  keywords: ['quản lý', 'cá nhân', 'next.js', 'tailwind'],
  authors: [{ name: 'KagMin' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        <GoogleProvider>
          <AuthHydrator />
          <main>{children}</main>
        </GoogleProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              fontSize: '0.875rem',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            },
          }}
        />
      </body>
    </html>
  )
}
