'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (password !== confirm) {
            setError('비밀번호가 일치하지 않아요.')
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            setError('비밀번호 재설정에 실패했어요.')
        } else {
            setMessage('비밀번호가 성공적으로 변경되었어요!')
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-blue-200">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">새 비밀번호 설정</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">잊어버린 비밀번호를 다시 설정해보세요 🌱</p>

                {message && <div className="text-blue-600 text-sm mb-4 text-center">{message}</div>}
                {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? '변경 중...' : '비밀번호 변경하기'}
                    </button>
                </form>
            </div>
        </div>
    )
}
