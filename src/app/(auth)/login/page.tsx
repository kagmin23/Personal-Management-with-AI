'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Login } from '@/types/auth'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Shield, Sparkles, Target, User } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import type React from 'react'
import { ChangeEvent, useRef, useState } from 'react'

// Fixed classes for animated dots to avoid SSR/client mismatch and inline styles
const DOT_CLASSES: string[] = [
  'left-[5%] top-[12%] [animation-delay:0.2s] [animation-duration:2.8s]',
  'left-[14%] top-[28%] [animation-delay:0.6s] [animation-duration:3.4s]',
  'left-[22%] top-[40%] [animation-delay:1.2s] [animation-duration:2.6s]',
  'left-[30%] top-[18%] [animation-delay:0.9s] [animation-duration:3.0s]',
  'left-[38%] top-[55%] [animation-delay:1.5s] [animation-duration:4.0s]',
  'left-[46%] top-[72%] [animation-delay:0.3s] [animation-duration:2.4s]',
  'left-[54%] top-[20%] [animation-delay:1.8s] [animation-duration:3.2s]',
  'left-[62%] top-[64%] [animation-delay:0.4s] [animation-duration:2.9s]',
  'left-[70%] top-[36%] [animation-delay:1.1s] [animation-duration:3.6s]',
  'left-[78%] top-[10%] [animation-delay:0.7s] [animation-duration:2.7s]',
  'left-[86%] top-[48%] [animation-delay:1.9s] [animation-duration:3.1s]',
  'left-[8%] top-[68%] [animation-delay:0.5s] [animation-duration:4.2s]',
  'left-[18%] top-[85%] [animation-delay:1.3s] [animation-duration:3.7s]',
  'left-[28%] top-[6%] [animation-delay:2.0s] [animation-duration:2.5s]',
  'left-[48%] top-[32%] [animation-delay:1.0s] [animation-duration:3.9s]',
  'left-[58%] top-[82%] [animation-delay:0.8s] [animation-duration:2.6s]',
  'left-[66%] top-[14%] [animation-delay:1.6s] [animation-duration:3.3s]',
  'left-[74%] top-[74%] [animation-delay:0.2s] [animation-duration:2.2s]',
  'left-[84%] top-[26%] [animation-delay:1.4s] [animation-duration:3.5s]',
  'left-[92%] top-[58%] [animation-delay:0.3s] [animation-duration:2.8s]'
]

export default function PersonalManagementLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const [showForm, setShowForm] = useState(() => searchParams.get('form') === '1')
  const [formData, setFormData] = useState<Login>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Login data:', formData)
      setIsLoading(false)
    }, 2000)
  }

  const goToRegister = (e: React.MouseEvent) => {
    e.preventDefault()
    if (containerRef.current) {
      containerRef.current.classList.add('swipe-left')
    }
    setTimeout(() => router.push('/register'), 250)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden auth-page">
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
          {/* Background Panel (Left) */}
          <section className="w-1/2 h-full relative">
            <div className="h-full relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden">
              {/* Animated Background Pattern (deterministic) */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                  {DOT_CLASSES.map((cls, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-white rounded-full animate-bounce ${cls}`}
                    />
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
                  <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <User className="w-14 h-14 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-4 h-4 text-yellow-800" />
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                  Personal
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                    Management
                  </span>
                </h1>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed font-light">
                  Transform your potential into success with our comprehensive platform for personal growth and development.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Shield className="w-4 h-4 text-green-300" />
                    <span className="text-sm text-white">Secure</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Target className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm text-white">Goal-Oriented</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Sparkles className="w-4 h-4 text-purple-300" />
                    <span className="text-sm text-white">AI-Powered</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={() => setShowForm(true)}
                  className="bg-white/20 hover:bg-white/30 text-white shadow-lg px-8 py-4 rounded-xl border border-white/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-lg font-semibold"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* Form Panel (Right) */}
          <section className="w-1/2 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold text-white mb-2">Welcome Back!</h2>
                <p className="text-slate-400 text-sm italic">Sign in to continue your journey.</p>
              </div>

              <div className="space-y-12">
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
                        className="pl-10 pr-4 py-4 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 rounded-xl focus:bg-slate-800 focus:border-blue-500 transition-all duration-300 text-xs backdrop-blur-sm"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
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
                        className="pl-10 pr-14 py-4 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 rounded-xl focus:bg-slate-800 focus:border-blue-500 transition-all duration-300 text-xs backdrop-blur-sm"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-700"
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
                        className="w-4 h-4 text-blue-600 bg-slate-800/50 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      <span className="ml-3 text-slate-300 group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
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
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-4 border-slate-600/50 text-white hover:bg-slate-800/50 py-4 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

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
