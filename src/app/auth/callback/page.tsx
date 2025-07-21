'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
    const router = useRouter()
    const [handled, setHandled] = useState(false)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (handled || !session?.user) return

            setHandled(true) // 한 번만 실행되도록 설정

            console.log('✅ 로그인 성공:', session)

            const { data: existingUser, error: fetchError } = await supabase
                .from('user')
                .select('*')
                .eq('auth_id', session.user.id)
                .single()
            if (fetchError && fetchError.code !== 'PGRST116') {
                console.error('사용자 조회 중 오류:', fetchError)
            }

            if (!existingUser) {
                const { error: insertError } = await supabase.from('user').insert({
                    auth_id: session.user.id,
                    email: session.user.email,
                    username: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
                    profile_image: session.user.user_metadata?.avatar_url || '',
                    phone_number: '',
                })

                if (insertError) {
                    console.error('사용자 등록 실패:', insertError)
                } else {
                    console.log('신규 사용자 등록 완료')
                }
            }

            router.push('/')
        })

        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [router, handled])

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
