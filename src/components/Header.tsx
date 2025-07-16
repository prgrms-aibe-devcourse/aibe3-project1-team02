'use client'

import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setUser(user)
        }

        getUser()
    }, [])

    const router = useRouter()
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut()
            setUser(null) // 로그아웃 후 사용자 상태를 null로 업데이트
            router.push('/')
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error)
        }
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-600 font-pacifico">
                            TripPlan
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                            홈
                        </Link>
                        <Link
                            href="/destinations"
                            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            여행지
                        </Link>
                        <Link
                            href="/planner"
                            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            여행계획
                        </Link>
                        <Link
                            href="/my-plans"
                            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            내 여행계획
                        </Link>
                        <Link
                            href="/community"
                            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            여행후기
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">{user.email} 님</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                    로그인
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                    회원가입
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            <i className="ri-menu-line text-xl"></i>
                        </div>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-2 space-y-2">
                        <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                            홈
                        </Link>
                        <Link href="/destinations" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                            여행지
                        </Link>
                        <Link href="/planner" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                            여행계획
                        </Link>
                        <Link href="/my-plans" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                            내 여행계획
                        </Link>
                        <Link href="/community" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                            여행후기
                        </Link>
                        <div className="border-t pt-2 space-y-2">
                            {user ? (
                                <>
                                    <span className="block px-3 py-2 text-gray-700">{user.email} 님</span>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-3 py-2 text-left text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
                                    >
                                        로그인
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                                    >
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
