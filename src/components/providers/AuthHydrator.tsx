'use client'

import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

// Hydrates auth state from storage (localStorage preferred, fallback sessionStorage)
export default function AuthHydrator() {
  const login = useAuthStore(s => s.login)
  const tokenInStore = useAuthStore(s => s.token)

  useEffect(() => {
    if (tokenInStore) return
    try {
      const storageToken = localStorage.getItem('token') || sessionStorage.getItem('token')
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user')
      if (storageToken && userStr) {
        const user = JSON.parse(userStr)
        login(user, storageToken)
      }
    } catch {
      // silent
    }
  }, [login, tokenInStore])

  return null
}
