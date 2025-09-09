'use client'

import LogoLoader from '@/components/LogoLoader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { googleLogin, register } from '@/services/auth/authService'
import { useAuthStore } from '@/stores/authStore'
import { ApiError, User as AuthUser, LoginResponse, Register } from '@/types/auth'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Shield, Sparkles, Target, User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { DOT_CLASSES } from './components/dot'

export default function PersonalManagementRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<Register>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const authLogin = useAuthStore(s => s.login)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Only render GoogleLogin after mount to avoid FedCM AbortError
  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await register(formData.email, formData.password, formData.confirmPassword)
      toast.success(res.message || '✅ Register Successfully!')
      setRedirecting(true)
      setTimeout(() => router.push('/login?form=1'), 3000)
    } catch (err: unknown) {
      const error = err as ApiError
      if (error.messages) {
        error.messages.forEach(msg => toast.error(msg))
      } else if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred while registering in.')
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
      const res: LoginResponse = await googleLogin(idToken)
      toast.success(res?.message || '✅ Google Account Linked!')
      const token: string = res?.token ?? res?.data?.token ?? ''
      const user: AuthUser = res?.user ?? res?.data?.user ?? { email: '' }
      if (token) {
        authLogin(user, token)
        localStorage.setItem('token', token)
      }
      if (user?.email) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('email', user.email)
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
        toast.error('Google registration/login failed.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const goToLogin = (e: React.MouseEvent) => {
    e.preventDefault()
    if (containerRef.current) {
      containerRef.current.classList.add('swipe-right')
    }
    setIsLoading(true)
    setTimeout(() => router.push('/login?form=1'), 250)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden auth-page">
      {(isLoading || redirecting) && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <LogoLoader
            fullScreen={false}
            label={redirecting ? 'Redirecting to login page...' : 'Page turning...'}
            size="lg"
          />
        </div>
      )}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="w-full max-w-6xl h-[700px] relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        <div className="flex h-full w-[200%] transition-transform duration-1000 ease-out translate-x-[-50%]">
          {/* Background Panel (Left) */}
          <section className="w-1/2 h-full relative">
            <div className="h-full relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                  {DOT_CLASSES.map((cls, i) => (
                    <div key={i} className={`absolute w-2 h-2 bg-white rounded-full animate-bounce ${cls}`} />
                  ))}
                </div>
              </div>

              {/* Geometric Decorations */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-16 left-16 w-32 h-32 border-2 border-white/50 rounded-full animate-spin-slow"></div>
                <div className="absolute top-40 right-20 w-24 h-24 border border-white/50 transform rotate-45 animate-pulse"></div>
                <div className="absolute bottom-24 left-24 w-40 h-40 border border-white/30 transform rotate-12 animate-bounce-slow"></div>
                <div className="absolute bottom-40 right-16 w-20 h-20 bg-white/20 rounded-full animate-ping"></div>
              </div>

              {/* Content */}
              <div className="text-center z-10 px-8 max-w-2xl">
                <div className="relative mb-8">
                  <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30">
                    <UserIcon className="w-14 h-14 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-4 h-4 text-yellow-800" />
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                  Create
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                    Your Account
                  </span>
                </h1>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed font-light">
                  Join our platform and unlock a suite of tools to manage your personal growth.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Shield className="w-4 h-4 text-green-300" />
                    <span className="text-sm text-white">Privacy First</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Target className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm text-white">Focus Goals</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Sparkles className="w-4 h-4 text-purple-300" />
                    <span className="text-sm text-white">AI Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Register Form (Right) */}
          <section className="w-1/2 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
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
                <h2 className="text-3xl font-bold text-white mb-2">Create Account!</h2>
                <p className="text-slate-400 text-xs italic">Start your journey with us.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 text-xs font-medium">
                      Email Address
                      <span className="text-red-400 ml-1 italic text-[9px]">( * use real email for verify )</span>
                    </Label>
                    <div className="relative group">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="pl-9.5 pr-4 py-4 text-[12px] placeholder:text-[11px] bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 rounded-xl focus:bg-slate-800 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-300 text-xs font-medium">Password</Label>
                    <div className="relative group">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter a password"
                        required
                        className="pl-9.5 pr-14 py-4 placeholder:text-[11px] bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 rounded-xl focus:bg-slate-800 focus:border-blue-500 transition-all duration-300 text-xs backdrop-blur-sm"
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

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-slate-300 text-xs font-medium">Confirm Password</Label>
                    <div className="relative group">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                        className="pl-9.5 pr-14 py-4 placeholder:text-[11px] bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 rounded-xl focus:bg-slate-800 focus:border-blue-500 transition-all duration-300 text-xs backdrop-blur-sm"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Register
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="flex items-center my-8">
                  <div className="flex-1 border-t border-slate-600/50"></div>
                  <span className="px-6 text-slate-400 text-xs font-medium">or</span>
                  <div className="flex-1 border-t border-slate-600/50"></div>
                </div>

                {/* Social / Google Login */}
                <div className="w-full flex flex-col items-center">
                {mounted ? (
                  <div className="w-full flex items-center justify-center p-2 rounded-xl bg-transparent border border-slate-600/50 hover:bg-slate-800/50 transition-all duration-300 backdrop-blur-sm">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => {
                        console.warn('[GoogleLogin] onError triggered')
                        toast.error('Google login failed.')
                      }}
                      containerProps={{
                        style: {
                          width: '100%',
                        },
                      }}
                      theme="outline"
                      shape="rectangular"
                      text="signin_with"
                      locale="en"
                    />
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center py-4 text-[11px] text-slate-400 border border-dashed border-slate-600/40 rounded-xl">Loading Google...</div>
                )}
                <p className="text-[10px] italic text-slate-500 mt-2">Protected by Google reCAPTCHA</p>
              </div>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-xs text-center">
                <p className="text-slate-400">
                  Already have an account?{' '}
                  <a href="/login?form=1" onClick={goToLogin} className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        @keyframes swipe-right { from { transform: translateX(0); opacity: 1; } to { transform: translateX(60px); opacity: 0.8; } }
        .swipe-right { animation: swipe-right 450ms cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  )
}
