'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Login } from '@/types/auth'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function PersonalManagementLogin() {
    const [showPassword, setShowPassword] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState<Login>({
        email: '',
        password: '',
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Login data:', formData)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-blue-950/90 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl h-[600px] relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
                {/* Slider Container */}
                <div
                    className={`flex h-full w-[200%] transition-transform duration-700 ease-in-out ${showForm ? '-translate-x-1/2' : 'translate-x-0'
                        }`}
                >
                    {/* Background Panel (Left) */}
                    <section className="w-1/2 h-full relative">
                        <div className="h-full relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center">
                            {/* Decorations */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                                <div className="absolute top-40 right-20 w-24 h-24 border border-white transform rotate-45"></div>
                                <div className="absolute bottom-20 left-20 w-40 h-40 border border-white transform rotate-12"></div>
                                <div className="absolute bottom-40 right-10 w-20 h-20 bg-white rounded-full opacity-10"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white rounded-full opacity-10"></div>
                            </div>

                            {/* Content */}
                            <div className="text-center z-10 px-8 max-w-xl">
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-4">Personal Management</h1>
                                <p className="text-lg md:text-sm text-blue-100 mb-8 leading-relaxed">
                                    A comprehensive platform for managing and developing yourself.
                                </p>
                                <Button
                                    size="lg"
                                    onClick={() => setShowForm(true)}
                                    className="bg-white/20 hover:bg-white/30 text-white shadow-lg px-6 py-3"
                                >
                                    Login Now
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Form Panel (Right) */}
                    <section className="w-1/2 h-full bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 flex items-center justify-center p-6 md:p-12">
                        <div className="w-full max-w-md">
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                                <p className="text-slate-400 text-sm italic">Login to access your account.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <Label htmlFor="email" className="text-slate-300">
                                        Email
                                    </Label>
                                    <div className="relative mt-2">
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            required
                                            className="pl-9 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                                        />
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <Label htmlFor="password" className="text-slate-300">
                                        Password
                                    </Label>
                                    <div className="relative mt-2">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter your password"
                                            required
                                            className="pl-9 pr-12 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                                        />
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-slate-300">Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg flex items-center justify-center gap-2 py-3"
                                >
                                    Login
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-slate-600"></div>
                                <span className="px-4 text-sm text-slate-400">or</span>
                                <div className="flex-1 border-t border-slate-600"></div>
                            </div>

                            {/* Social Login */}
                            <div className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-3 border-slate-600 text-white hover:bg-slate-800"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
