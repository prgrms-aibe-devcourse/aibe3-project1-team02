'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase-browser'

interface TravelPlan {
    id: string
    title: string
    destination: string
    startDate: string
    endDate: string
    travelers: number
    status: 'planning' | 'confirmed' | 'completed'
    budget: string
    image: string
    progress: number
    planDetails?: {
        price: string
        original_price: string
        discount: string
        includes: string[]
    }
}

export default function MyPlansPage() {
    const [plans, setPlans] = useState<TravelPlan[]>([])
    const [activeTab, setActiveTab] = useState<'all' | 'planning' | 'confirmed' | 'completed'>('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPlans = async () => {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser()
            if (!user) {
                setPlans([])
                setLoading(false)
                return
            }

            const res = await fetch(`/api/plans?user_id=${user.id}`)
            const data = await res.json()
            if (data.success) setPlans(data.plans)
            setLoading(false)
        }
        fetchPlans()
    }, [])

    const filteredPlans = activeTab === 'all' ? plans : plans.filter((plan) => plan.status === activeTab)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'planning':
                return 'bg-yellow-100 text-yellow-800'
            case 'confirmed':
                return 'bg-green-100 text-green-800'
            case 'completed':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'all':
                return '전체'
            case 'planning':
                return '계획 중'
            case 'confirmed':
                return '확정됨'
            case 'completed':
                return '완료됨'
            default:
                return '알 수 없음'
        }
    }

    const getBudgetText = (budget: string) => {
        switch (budget) {
            case 'low':
                return '50만원 이하'
            case 'medium':
                return '50-100만원'
            case 'high':
                return '100-200만원'
            default:
                return '알 수 없음'
        }
    }

    const getDestinationImage = (destination: string, originalImage: string) => {
        switch (destination) {
            case '제주도':
                return 'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20with%20Hallasan%20mountain%20and%20emerald%20sea%2C%20peaceful%20Korean%20island%20landscape%20with%20traditional%20stone%20walls%20and%20natural%20beauty&width=300&height=200&seq=jeju-plan-1&orientation=landscape'
            case '부산':
                return 'https://readdy.ai/api/search-image?query=Busan%20coastal%20city%20with%20colorful%20Gamcheon%20village%20and%20beautiful%20beaches%2C%20vibrant%20Korean%20seaside%20destination%20with%20modern%20and%20traditional%20elements&width=300&height=200&seq=busan-plan-2&orientation=landscape'
            case '도쿄':
                return 'https://readdy.ai/api/search-image?query=Tokyo%20cityscape%20with%20cherry%20blossoms%20and%20modern%20skyscrapers%2C%20bustling%20Japanese%20metropolitan%20city%20with%20cultural%20landmarks%20and%20vibrant%20street%20life&width=300&height=200&seq=tokyo-plan-3&orientation=landscape'
            case '파리':
                return 'https://readdy.ai/api/search-image?query=Paris%20romantic%20cityscape%20with%20Eiffel%20Tower%20and%20Seine%20river%2C%20elegant%20French%20capital%20with%20classic%20architecture%20and%20charming%20atmosphere&width=300&height=200&seq=paris-plan-4&orientation=landscape'
            default:
                return originalImage
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">내 여행 계획</h1>
                    <p className="text-xl text-blue-100">나만의 여행 계획을 관리하고 추억을 기록해보세요</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
                        {(['all', 'planning', 'confirmed', 'completed'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                                    activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                {getStatusText(tab)} (
                                {tab === 'all' ? plans.length : plans.filter((p) => p.status === tab).length})
                            </button>
                        ))}
                    </div>
                    <Link
                        href="/planner"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
                    >
                        새 계획 만들기
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-16">불러오는 중...</div>
                ) : filteredPlans.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">여행 계획이 없습니다.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlans.map((plan) => {
                            // 확정된(패키지 예약 확정) 카드
                            if (plan.status === 'confirmed' && plan.planDetails) {
                                const details = plan.planDetails
                                return (
                                    <Link key={plan.id} href={`/my-plans/${plan.id}`} className="block">
                                        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 max-w-md flex flex-col h-full">
                                            <div className="relative h-48">
                                                <img
                                                    src={plan.image}
                                                    alt={plan.title}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                                {details.discount && (
                                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                                                        {details.discount}
                                                        {String(details.discount).includes('%') ? '' : '%'} 할인
                                                    </div>
                                                )}
                                                <div className="absolute top-4 right-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                                            plan.status,
                                                        )}`}
                                                    >
                                                        {getStatusText(plan.status)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                                                <div className="mb-4">
                                                    <span className="text-2xl font-bold text-blue-600">
                                                        {details.price
                                                            ? (() => {
                                                                  const price = details.price as any
                                                                  if (typeof price === 'number') {
                                                                      return `${price.toLocaleString()}원`
                                                                  } else {
                                                                      return `${Number(
                                                                          String(price).replace(/[^0-9]/g, ''),
                                                                      ).toLocaleString()}원`
                                                                  }
                                                              })()
                                                            : ''}
                                                    </span>
                                                    {details.original_price && (
                                                        <span className="text-lg text-gray-400 line-through ml-2">
                                                            {(() => {
                                                                const originalPrice = details.original_price as any
                                                                if (typeof originalPrice === 'number') {
                                                                    return `${originalPrice.toLocaleString()}원`
                                                                } else {
                                                                    return originalPrice
                                                                }
                                                            })()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mb-6 flex-grow">
                                                    <h4 className="font-medium text-gray-900 mb-2">포함 사항</h4>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        {details.includes &&
                                                            details.includes.map((item: string, idx: number) => (
                                                                <li key={idx} className="flex items-center gap-2">
                                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                                        <i className="ri-check-line text-green-500 text-xs"></i>
                                                                    </div>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium mt-auto">
                                                    계획 보기
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }

                            // 그 외(일반 여행계획 카드)
                            return (
                                <Link key={plan.id} href={`/my-plans/${plan.id}`} className="block">
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col max-w-md mb-8">
                                        <div className="relative h-48">
                                            <img
                                                src={getDestinationImage(plan.destination, plan.image)}
                                                alt={plan.title}
                                                className="w-full h-full object-cover object-top"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                                        plan.status,
                                                    )}`}
                                                >
                                                    {getStatusText(plan.status)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.title}</h3>
                                            <p className="text-gray-600 mb-4">{plan.destination}</p>
                                            <div className="space-y-2 mb-4 flex-grow">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <i className="ri-calendar-line w-4 h-4 mr-2" />
                                                    <span>
                                                        {plan.startDate} ~ {plan.endDate}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <i className="ri-user-line w-4 h-4 mr-2" />
                                                    <span>{plan.travelers}명</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <i className="ri-wallet-line w-4 h-4 mr-2" />
                                                    <span>{getBudgetText(plan.budget)}</span>
                                                </div>
                                            </div>
                                            {plan.status === 'planning' && (
                                                <div className="mb-4">
                                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                        <span>계획 진행률</span>
                                                        <span>{plan.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${plan.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mt-auto">
                                                <div className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm font-medium">
                                                    {plan.status === 'completed' ? '여행 기록 보기' : '계획 보기'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
