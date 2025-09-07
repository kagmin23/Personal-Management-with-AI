'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div key={pathname} className="route-slide-in">
            {children}
            <style jsx global>{`
        @keyframes route-slide-in {
          from { transform: translateX(32px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .route-slide-in { animation: route-slide-in 420ms cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
        </div>
    )
}

