'use client'

import LogoLoader from '@/components/LogoLoader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loadRememberState, persistAuth } from '@/lib/authStorage'
import { googleLogin, login as loginApi } from '@/services/auth/authService'
import { useAuthStore } from '@/stores/authStore'
import { ApiError, Login, LoginResponse, User } from '@/types/auth'
import { CredentialResponse } from '@react-oauth/google'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import type React from 'react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { GoogleSignInButton, MarketingPanel } from './components'
// (dot styles still used in MarketingPanel)

export default function PersonalManagementLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const [showForm, setShowForm] = useState(() => searchParams.get('form') === '1')
  const [formData, setFormData] = useState<Login>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const authLogin = useAuthStore(s => s.login)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const { email, remember } = loadRememberState()
    if (remember) {
      setFormData(prev => ({ ...prev, email }))
      setRememberMe(true)
    }
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    const email = formData.email.trim()
    const password = formData.password.trim()

    if (!email) {
      toast.error("Email is required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email")
      return
    }

    if (!password) {
      toast.error("Password is required")
      return
    }

    setIsLoading(true)
    try {
      const res: LoginResponse = await loginApi(formData.email, formData.password)
      toast.success(res?.message || '✅ Login Successfully!')

      const token: string = res?.token ?? res?.data?.token ?? ''
      const user: User = res?.user ?? res?.data?.user ?? { email: '' }

      if (token) {
        authLogin(user, token)
        persistAuth(user, token, rememberMe)
      }

      setRedirecting(true)
      setTimeout(() => router.push('/verify'), 2000)
    } catch (err: unknown) {
      const error = err as ApiError
      if (error?.messages?.length) {
        error.messages.forEach(msg => toast.error(msg))
      } else if (error?.message) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred while logging in.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential
    if (!idToken) {
      toast.error('Google credential not found.')
      return
    }
    setIsLoading(true)
    try {
      const res = await googleLogin(idToken)
      toast.success(res?.message || '✅ Login with Google Successfully!')
      const token: string = res?.token ?? res?.data?.token ?? ''
      const user: User = res?.user ?? res?.data?.user ?? { email: '' }
      if (token) {
        authLogin(user, token)
        persistAuth(user, token, rememberMe)
      }
      setRedirecting(true)
      setTimeout(() => router.push('/verify'), 2000)
    } catch (err: unknown) {
      const error = err as ApiError
      if (error?.messages?.length) {
        error.messages.forEach(msg => toast.error(msg))
      } else if (error?.message) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred while logging in with Google.')
      }
    } finally {
      setIsLoading(false)
    }
  }


  const goToRegister = (e: React.MouseEvent) => {
    e.preventDefault()
    if (containerRef.current) {
      containerRef.current.classList.add('swipe-left')
    }
    setIsLoading(true)
    setTimeout(() => router.push('/register'), 250)
  }
  const goToForgot = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => router.push('/forgot-password'), 150)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden auth-page">
      {(isLoading || redirecting) && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <LogoLoader fullScreen={false} label={redirecting ? 'Page turning...' : 'Page turning...'} size="lg" />
        </div>
      )}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="w-full max-w-6xl h-[700px] relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        {/* Slider Container */}
        <div
          className={`flex h-full w-[200%] transition-transform duration-1000 ease-out ${showForm ? '-translate-x-1/2' : 'translate-x-0'}`}
        >
          <MarketingPanel onGetStarted={() => setShowForm(true)} />

          {/* Form Panel (Right) */}
          <section className="w-1/2 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="mb-10 text-center">
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/logo.svg"
                    alt="App Logo"
                    width={64}
                    height={64}
                    priority
                    className="drop-shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                <p className="text-slate-400 text-xs italic">Sign in to continue your journey.</p>
              </div>

              <div className="space-y-7">
                {/* Email */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-slate-300 text-xs font-medium">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                        className="pl-9.5 pr-4 py-4 bg-slate-800/50 text-[12px] placeholder:text-[11px] border-slate-600/50 text-white placeholder-slate-500 rounded-xl focus:bg-slate-800 focus:border-blue-500 transition-all duration-300 text-xs backdrop-blur-sm"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2 mb-3">
                    <Label htmlFor="password" className="text-slate-300 text-xs font-medium">
                      Password
                    </Label>
                    <div className="relative group">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                        className="pl-9.5 pr-14 py-4 bg-slate-800/50 text-[12px] placeholder:text-[11px] border-slate-600/50 text-white placeholder-slate-500 rounded-xl focus:bg-slate-800 focus:border-blue-500 transition-all duration-300 text-xs backdrop-blur-sm"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>
                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 text-blue-600 bg-slate-800/50 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      <span className="ml-2 text-slate-300 group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <a href="/forgot-password" onClick={goToForgot} className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                      Forgot password?
                    </a>
                  </div>
                </div>
                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 border-t border-slate-600/50"></div>
                <span className="px-6 text-slate-400 text-xs font-medium">or</span>
                <div className="flex-1 border-t border-slate-600/50"></div>
              </div>

              {/* Social Login */}
              <GoogleSignInButton mounted={mounted} onSuccess={handleGoogleSuccess} />

              {/* Register Link */}
              <div className="mt-8 text-xs text-center">
                <p className="text-slate-400">
                  Don&apos;t have an account?{' '}
                  <a href="/register" onClick={goToRegister} className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors">
                    Create account
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        @keyframes swipe-left {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-60px); opacity: 0.8; }
        }
        .swipe-left { animation: swipe-left 450ms cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  )
}
