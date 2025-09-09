'use client'

import type { User } from '@/types/auth';

const REMEMBER_FLAG = 'remember_me'
const REMEMBERED_EMAIL = 'remembered_email'

export function loadRememberState(): { email: string; remember: boolean } {
  try {
    const remember = localStorage.getItem(REMEMBER_FLAG) === '1'
    const email = remember ? (localStorage.getItem(REMEMBERED_EMAIL) || '') : ''
    return { email, remember }
  } catch {
    return { email: '', remember: false }
  }
}

export function persistAuth(user: User, token: string, remember: boolean) {
  if (!token) return
  try {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('token', token)
    storage.setItem('user', JSON.stringify(user))
    if (user?.email) storage.setItem('email', user.email)

    if (remember && user?.email) {
      localStorage.setItem(REMEMBERED_EMAIL, user.email)
      localStorage.setItem(REMEMBER_FLAG, '1')
    } else if (!remember) {
      localStorage.removeItem(REMEMBER_FLAG)
      localStorage.removeItem(REMEMBERED_EMAIL)
    }
  } catch {
    // silent
  }
}
