'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'

interface SignupFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone: string
    agreementTerms: boolean
    agreementPrivacy: boolean
    agreementMarketing: boolean
}

export default function SignupForm() {
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        agreementTerms: false,
        agreementPrivacy: false,
        agreementMarketing: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const SignUp = () => {
        const supabaseClient = useSupabaseClient()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = '이름을 입력해주세요.'
        }

        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요.'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다.'
        }

        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요.'
        } else if (formData.password.length < 8) {
            newErrors.password = '비밀번호는 8자 이상이어야 합니다.'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = '휴대폰 번호를 입력해주세요.'
        } else if (!/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(formData.phone.replace(/-/g, ''))) {
            newErrors.phone = '올바른 휴대폰 번호 형식이 아닙니다.'
        }

        if (!formData.agreementTerms) {
            newErrors.agreementTerms = '이용약관에 동의해주세요.'
        }

        if (!formData.agreementPrivacy) {
            newErrors.agreementPrivacy = '개인정보 처리방침에 동의해주세요.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                        phone: formData.phone,
                        agreementTerms: formData.agreementTerms,
                        agreementPrivacy: formData.agreementPrivacy,
                        agreementMarketing: formData.agreementMarketing,
                    },
                },
            })

            if (error) {
                console.error('Signup error:', error)
                setErrors({
                    submit: error.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
                })
                return
            }

            if (data.user) {
                console.log('Signup successful:', data)
                window.location.href = '/login'
            }
        } catch (err) {
            console.error('Unexpected error:', err)
            setErrors({ submit: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectAll = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            agreementTerms: checked,
            agreementPrivacy: checked,
            agreementMarketing: checked,
        }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
                    <p className="text-gray-600">새로운 계정을 만들어 여행을 시작하세요</p>
                </div>

                <div className="bg-white shadow-sm rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {errors.submit}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                    errors.name ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="홍길동"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="example@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 *</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                        errors.password ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="8자 이상 입력하세요"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <i className={`ri-eye-${showPassword ? 'off-' : ''}line`}></i>
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인 *</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="비밀번호를 다시 입력하세요"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <i className={`ri-eye-${showConfirmPassword ? 'off-' : ''}line`}></i>
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">휴대폰 번호 *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                    errors.phone ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="010-1234-5678"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={
                                        formData.agreementTerms &&
                                        formData.agreementPrivacy &&
                                        formData.agreementMarketing
                                    }
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">전체 동의</span>
                            </div>

                            <div className="pl-6 space-y-2 border-l-2 border-gray-100">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="agreementTerms"
                                        checked={formData.agreementTerms}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">이용약관 동의 (필수)</span>
                                </label>
                                {errors.agreementTerms && (
                                    <p className="text-red-500 text-xs ml-6">{errors.agreementTerms}</p>
                                )}

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="agreementPrivacy"
                                        checked={formData.agreementPrivacy}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">개인정보 처리방침 동의 (필수)</span>
                                </label>
                                {errors.agreementPrivacy && (
                                    <p className="text-red-500 text-xs ml-6">{errors.agreementPrivacy}</p>
                                )}

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="agreementMarketing"
                                        checked={formData.agreementMarketing}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">마케팅 정보 수신 동의 (선택)</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer font-medium"
                        >
                            {isLoading ? '가입 중...' : '회원가입'}
                        </button>
                    </form>

                    <div className="mt-4">
                        <button
                            onClick={async () => {
                                const { error } = await supabase.auth.signInWithOAuth({
                                    provider: 'kakao',
                                    options: {
                                        redirectTo: `http://localhost:3000/auth/callback`,
                                    },
                                })
                                if (error) console.error('Error:', error.message)
                            }}
                            className="w-full py-3 px-4 bg-[#FEE500] text-[#000000] rounded-lg hover:bg-[#FDD835] transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center justify-center space-x-2"
                        >
                            <img src="/kakao-logo.png" alt="Kakao" className="w-5 h-5" />
                            <span>카카오로 시작하기</span>
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                        이미 계정이 있으신가요?{' '}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
