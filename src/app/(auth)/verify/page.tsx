'use client'

import LogoLoader from '@/components/LogoLoader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resendOtp, verifyOtp } from '@/services/auth/authService'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [isLoading, setIsLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`)
        next?.focus()
      }
    }
  }

  interface ApiError { message?: string; messages?: string[] }

  const handleSubmit = async () => {
    const code = otp.join('')
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    const email = stored ? (() => { try { return JSON.parse(stored)?.email as string | undefined } catch { return undefined } })() : undefined

    if (!email) {
      toast.error('Email not found. Please login again.')
      router.push('/login?form=1')
      return
    }

    setIsLoading(true)
    try {
      const res = await verifyOtp(email, code)
      toast.success(res?.message || '✅ Verify Successfully!')
      setRedirecting(true)
      setTimeout(() => router.push('/ai-assistant'), 2000)
    } catch (err: unknown) {
      const error = err as ApiError
      if (error?.messages?.length) error.messages.forEach(m => toast.error(m))
      else if (error?.message) toast.error(error.message)
      else toast.error('An error occurred while verifying.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {(isLoading || redirecting) && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <LogoLoader
            fullScreen={false}
            label={redirecting ? 'Page turning...' : 'Page turning...'}
            size="lg"
          />
        </div>
      )}
      {/* background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl p-10 relative z-10">
        {/* nút back */}
        <Button
          onClick={() => {
            setIsLoading(true)
            setTimeout(() => router.push('/login?form=1'), 150)
          }}
          className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

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
          <h2 className="text-3xl font-bold text-white mb-2">Verify your account</h2>
          <p className="text-slate-400 text-sm italic">
            Enter the 6-digit code we sent to your email.
          </p>
        </div>

        {/* OTP inputs */}
        <div className="flex justify-between mb-10">
          {otp.map((digit, i) => (
            <Input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-14 text-center text-lg bg-slate-800/50 border-slate-600/50 text-white rounded-xl focus:border-blue-500 focus:bg-slate-800 transition-all"
            />
          ))}
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading || otp.join('').length < 6}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Verifying...
            </>
          ) : (
            <>
              Verify
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        {/* Resend OTP */}
        <div className="mt-6 text-center text-xs">
          <p className="text-slate-400">
            Didn’t receive the code?{' '}
            <button
              className="text-blue-400 hover:text-blue-300 underline transition-colors font-medium"
              onClick={async () => {
                const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null
                const email = stored ? (() => { try { return JSON.parse(stored)?.email as string | undefined } catch { return undefined } })() : undefined
                if (!email) {
                  toast.error('Email not found. Please login again.')
                  router.push('/login?form=1')
                  return
                }
                setIsLoading(true)
                try {
                  const res = await resendOtp(email)
                  toast.success(res?.message || 'OTP resent to your email')
                } catch (err: unknown) {
                  const error = err as { message?: string; messages?: string[] }
                  if (error?.messages?.length) error.messages.forEach(m => toast.error(m))
                  else if (error?.message) toast.error(error.message)
                  else toast.error('Failed to resend OTP')
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
