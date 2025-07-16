'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useEffect } from 'react'
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
}

export default function MyPlansPage() {
    const [plans, setPlans] = useState<TravelPlan[]>([])
    const [activeTab, setActiveTab] = useState<'all' | 'planning' | 'confirmed' | 'completed'>('all')

    useEffect(() => {
        fetch('/api/plans')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setPlans(data.plans)
            })
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

    /*
    const mockPlans: TravelPlan[] = [
        {
            id: '1',
            title: '제주도 힐링 여행',
            destination: '제주도',
            startDate: '2024-03-15',
            endDate: '2024-03-18',
            travelers: 2,
            status: 'planning',
            budget: '100만원',
            image: 'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20with%20Hallasan%20mountain%20and%20emerald%20sea%2C%20peaceful%20Korean%20island%20landscape%20with%20traditional%20stone%20walls%20and%20natural%20beauty%2C%20serene%20travel%20destination&width=300&height=200&seq=myplan-jeju-1&orientation=landscape',
            progress: 65,
        },
        {
            id: '2',
            title: '부산 맛집 투어',
            destination: '부산',
            startDate: '2024-04-01',
            endDate: '2024-04-03',
            travelers: 4,
            status: 'confirmed',
            budget: '80만원',
            image: 'https://readdy.ai/api/search-image?query=Busan%20coastal%20city%20with%20colorful%20Gamcheon%20village%20and%20beautiful%20beaches%2C%20vibrant%20Korean%20seaside%20destination%20with%20delicious%20food%20markets%20and%20cultural%20sites&width=300&height=200&seq=myplan-busan-2&orientation=landscape',
            progress: 100,
        },
        {
            id: '3',
            title: '서울 문화 탐방',
            destination: '서울',
            startDate: '2024-02-10',
            endDate: '2024-02-12',
            travelers: 1,
            status: 'completed',
            budget: '50만원',
            image: 'https://readdy.ai/api/search-image?query=Seoul%20traditional%20palaces%20and%20modern%20cityscape%2C%20Korean%20capital%20with%20historic%20Gyeongbokgung%20palace%20and%20vibrant%20cultural%20districts%2C%20beautiful%20travel%20memories&width=300&height=200&seq=myplan-seoul-3&orientation=landscape',
            progress: 100,
        },
        {
            id: '4',
            title: '도쿄 벚꽃 여행',
            destination: '도쿄',
            startDate: '2024-04-20',
            endDate: '2024-04-25',
            travelers: 3,
            status: 'planning',
            budget: '200만원',
            image: 'https://readdy.ai/api/search-image?query=Tokyo%20cherry%20blossoms%20in%20full%20bloom%20with%20traditional%20temples%20and%20modern%20skyscrapers%2C%20beautiful%20Japanese%20spring%20landscape%20with%20pink%20sakura%20flowers%20and%20peaceful%20gardens&width=300&height=200&seq=myplan-tokyo-4&orientation=landscape',
            progress: 30,
        },
    ]
    */

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

                {filteredPlans.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <i className="ri-map-pin-line text-gray-400 text-3xl"></i>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">아직 여행 계획이 없습니다</h3>
                        <p className="text-gray-600 mb-6">첫 번째 여행 계획을 만들어보세요!</p>
                        <Link
                            href="/planner"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
                        >
                            계획 만들기
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={plan.image}
                                        alt={plan.title}
                                        className="w-full h-48 object-cover object-top"
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

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.title}</h3>
                                    <p className="text-gray-600 mb-4">{plan.destination}</p>

                                    <div className="space-y-2 mb-4">
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
                                            <span>{plan.budget}</span>
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

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm font-medium">
                                            {plan.status === 'completed' ? '여행 기록 보기' : '계획 보기'}
                                        </button>
                                        <button className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                <i className="ri-more-2-line"></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 text-center">
                        <h4 className="text-2xl font-bold text-blue-600 mb-2">{plans.length}</h4>
                        <p className="text-gray-600">총 여행 계획</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center">
                        <h4 className="text-2xl font-bold text-green-600 mb-2">
                            {plans.filter((p) => p.status === 'completed').length}
                        </h4>
                        <p className="text-gray-600">완료된 여행</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center">
                        <h4 className="text-2xl font-bold text-yellow-600 mb-2">
                            {plans.filter((p) => p.status === 'planning').length}
                        </h4>
                        <p className="text-gray-600">계획 중인 여행</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center">
                        <h4 className="text-2xl font-bold text-purple-600 mb-2">
                            {plans.reduce((acc, p) => acc + p.travelers, 0)}
                        </h4>
                        <p className="text-gray-600">총 여행 인원</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
