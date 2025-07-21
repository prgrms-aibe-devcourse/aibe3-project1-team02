'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                console.log('✅ 로그인 성공:', session)

                // user 테이블에 유저 정보 존재 여부 체크
                const { data: existingUser, error: fetchError } = await supabase
                    .from('user')
                    .select('auth_id')
                    .eq('auth_id', session.user.id)
                    .single()

                if (fetchError && fetchError.code !== 'PGRST116') {
                    // 예외 처리 (PGRST116: no rows found)
                    console.error('사용자 조회 중 오류:', fetchError)
                }

                if (!existingUser) {
                    // 신규 유저일 경우 user 테이블에 추가
                    const { error: insertError } = await supabase.from('user').insert({
                        auth_id: session.user.id,
                        email: session.user.email,
                        username: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
                        profile_image: session.user.user_metadata?.avatar_url || '',
                        phone_number: '', // 소셜 로그인에서는 따로 입력 받지 않으면 빈값 처리
                    })

                    if (insertError) {
                        console.error('사용자 등록 실패:', insertError)
                    } else {
                        console.log('신규 사용자 등록 완료')
                    }
                }

                router.push('/')
            } else {
                console.log('❌ 세션 없음 또는 로그인 실패')
                router.push('/login')
            }
        })

        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [router])

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
