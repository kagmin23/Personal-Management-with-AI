'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

interface GoogleProviderProps {
  children: React.ReactNode
}

// Wrap children with GoogleOAuthProvider only when a client id exists.
// The client id must be exposed as NEXT_PUBLIC_GOOGLE_CLIENT_ID
export function GoogleProvider({ children }: GoogleProviderProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID env variable. Google login will be disabled.')
    }
    return <>{children}</>
  }

  return (
    <GoogleOAuthProvider clientId={clientId} >
      {children}
    </GoogleOAuthProvider>
  )
}

export default GoogleProvider
