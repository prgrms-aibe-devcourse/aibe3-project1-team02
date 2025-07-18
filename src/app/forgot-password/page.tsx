'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/reset-password`,
        })

        if (error) {
            setError('비밀번호 재설정 이메일 전송에 실패했습니다.')
        } else {
            setMessage('재설정 링크가 이메일로 전송되었습니다.')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">비밀번호 재설정</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    가입한 이메일을 입력하면 <strong>재설정 링크</strong>를 보내드려요.
                </p>

                {message && <div className="text-blue-600 text-sm mb-4">{message}</div>}
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? '전송 중...' : '재설정 링크 보내기'}
                    </button>
                </form>
            </div>
        </div>
    )
}
