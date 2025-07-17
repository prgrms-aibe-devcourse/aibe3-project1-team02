'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession()

            if (data.session) {
                console.log('✅ 로그인 성공:', data.session)
                router.push('/') // 로그인 후 이동할 경로
            } else {
                console.error('❌ 세션 없음 또는 로그인 실패:', error)
                router.push('/login') // 로그인 실패 시 이동 경로
            }
        }

        checkSession()
    }, [])

    return <p>로그인 처리 중입니다...</p>
}
