'use client'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'

interface GoogleSignInButtonProps {
  onSuccess: (cred: CredentialResponse) => void
  mounted: boolean
}

export function GoogleSignInButton({ onSuccess, mounted }: GoogleSignInButtonProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {mounted ? (
        <div className="w-full flex items-center justify-center p-2 rounded-xl bg-transparent border border-slate-600/50 hover:bg-slate-800/50 transition-all duration-300 backdrop-blur-sm">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => {
              console.warn('[GoogleLogin] onError triggered')
              toast.error('Google login failed.')
            }}
            containerProps={{ style: { width: '100%' } }}
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
  )
}
