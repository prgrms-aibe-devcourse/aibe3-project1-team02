'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession()

            if (data.session) {
                console.log('✅ 로그인 성공:', data.session)
                router.push('/') // 홈으로 이동
            } else {
                console.error('❌ 로그인 실패 또는 세션 없음', error)
                router.push('/login') // 실패 시 로그인 페이지로
            }
        }

        checkSession()
    }, [])

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full border border-gray-200">
                <div className="flex justify-center mb-6">
                    <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">로그인 처리 중...</h2>
                <p className="text-gray-500 mt-2 text-sm">잠시만 기다려 주세요. 자동으로 홈으로 이동합니다.</p>
            </div>
        </main>
    )
}
