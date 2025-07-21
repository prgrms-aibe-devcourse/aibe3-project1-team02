'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

// 타입 정의...
interface DayPlan {
    date: string
    morning: string
    afternoon: string
    evening: string
}

interface TravelPlan {
    id: string
    title: string
    destination: string
    start_date: string
    end_date: string
    travelers: number
    status: 'planning' | 'confirmed' | 'completed'
    budget: string
    progress: number
    image: string
    plan_details: DayPlan[] | null
}

const budgetMap: { [key: string]: string } = {
    low: '50만원 이하',
    medium: '50-100만원',
    high: '100-200만원',
    luxury: '200만원 이상',
}

export default function PlanDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const [plan, setPlan] = useState<TravelPlan | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const handleDelete = async () => {
        if (window.confirm('정말로 이 계획을 삭제하시겠습니까?')) {
            try {
                const res = await fetch(`/api/plans/${id}`, {
                    method: 'DELETE',
                })
                const data = await res.json()
                if (!data.success) {
                    throw new Error(data.error || '삭제에 실패했습니다.')
                }
                alert('성공적으로 삭제되었습니다.')
                router.push('/my-plans')
            } catch (err: any) {
                setError(err.message)
                alert(`오류: ${err.message}`)
            }
        }
    }

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

    useEffect(() => {
        if (!id) return
        const fetchPlan = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/plans/${id}`)
                const data = await res.json()
                if (!data.success) {
                    throw new Error(data.error || '계획을 불러오는데 실패했습니다.')
                }
                setPlan(data.plan)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPlan()
    }, [id])

    if (loading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">에러: {error}</div>
    if (!plan) return <div className="flex justify-center items-center h-screen">해당 계획을 찾을 수 없습니다.</div>

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link href="/my-plans" className="text-blue-600 hover:underline">
                        &larr; 목록으로 돌아가기
                    </Link>
                    <div className="flex items-center mt-4">
                        <h1 className="text-4xl font-bold text-gray-900">{plan.title}</h1>
                        <span
                            className={`ml-4 px-4 py-1.5 text-base font-semibold rounded-full ${getStatusBadge(
                                plan.status,
                            )}`}
                        >
                            {getStatusText(plan.status)}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <i className="ri-information-line mr-3 text-blue-500"></i>
                            여행 계획 요약
                        </h2>
                        <div className="bg-blue-50 p-6 rounded-lg space-y-3 text-gray-700">
                            <p>
                                <strong>🗺 여행지:</strong> {plan.destination}
                            </p>
                            <p>
                                <strong>📆 일정:</strong> {plan.start_date} ~ {plan.end_date}
                            </p>
                            <p>
                                <strong>👥 인원:</strong> {plan.travelers}명
                            </p>
                            <p>
                                <strong>💰 예산:</strong> {budgetMap[plan.budget] || plan.budget}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <i className="ri-calendar-todo-line mr-3 text-blue-500"></i>
                            맞춤 일정
                        </h2>
                        {plan.plan_details && plan.plan_details.length > 0 ? (
                            <div className="space-y-6">
                                {plan.plan_details.map((day, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white">
                                        <h3 className="text-lg font-bold text-blue-600 mb-4">{day.date}</h3>
                                        <ul className="space-y-2 text-gray-600">
                                            <li>
                                                <strong>오전:</strong> {day.morning}
                                            </li>
                                            <li>
                                                <strong>오후:</strong> {day.afternoon}
                                            </li>
                                            <li>
                                                <strong>저녁:</strong> {day.evening}
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">생성된 상세 일정이 없습니다.</p>
                        )}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href={`/my-plans/${plan.id}/modify`}
                            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                        >
                            이 계획 수정하기
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-block ml-4 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition text-lg font-semibold"
                        >
                            삭제하기
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
