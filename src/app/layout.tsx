import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PerMan AI',
  description: 'Personal Management Syste',
  keywords: ['quản lý', 'cá nhân', 'next.js', 'tailwind'],
  authors: [{ name: 'KagMin' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} antialiased bg-background text-foreground`}>
        {/* Global Loading/Error Boundary có thể thêm ở đây */}
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
