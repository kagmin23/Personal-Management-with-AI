'use client'
import { Button } from '@/components/ui/button'
import { Shield, Sparkles, Target, UserCog } from 'lucide-react'
import { DOT_CLASSES } from '../components/dot'

interface MarketingPanelProps { onGetStarted: () => void }

export function MarketingPanel({ onGetStarted }: MarketingPanelProps) {
  return (
    <section className="w-1/2 h-full relative">
      <div className="h-full relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {DOT_CLASSES.map((cls, i) => (
              <div key={i} className={`absolute w-2 h-2 bg-white rounded-full animate-bounce ${cls}`} />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-16 left-16 w-32 h-32 border-2 border-white/50 rounded-full animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/50 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-24 left-24 w-40 h-40 border border-white/30 transform rotate-12 animate-bounce-slow"></div>
          <div className="absolute bottom-40 right-16 w-20 h-20 bg-white/20 rounded-full animate-ping"></div>
        </div>
        <div className="text-center z-10 px-8 max-w-2xl">
          <div className="relative mb-8">
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
              <UserCog className="w-14 h-14 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Personal
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Management</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed font-light">Transform your potential into success with our comprehensive platform for personal growth and development.</p>
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
          <Button size="lg" onClick={onGetStarted} className="bg-white/20 hover:bg-white/30 text-white shadow-lg px-8 py-4 rounded-xl border border-white/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-lg font-semibold">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}
