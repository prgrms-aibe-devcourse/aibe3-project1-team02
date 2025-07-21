'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import MyPlanEditor from '@/components/MyPlanEditor'

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
    interests: string[] | null
    plan_details: DayPlan[] | null
}

const budgetMap: { [key: string]: string } = {
    low: '50만원 이하',
    medium: '50-100만원',
    high: '100-200만원',
    luxury: '200만원 이상',
}

export default function ModifyPlanPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const [plan, setPlan] = useState<TravelPlan | null>(null)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!id) {
            setError('잘못된 접근입니다. 계획 ID가 필요합니다.')
            setLoading(false)
            return
        }
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        if (!plan) return
        const newValue = name === 'travelers' ? parseInt(value, 10) : value
        setPlan((prevPlan) => ({
            ...prevPlan!,
            [name]: newValue,
        }))
    }

    const handlePlanDetailsChange = (newPlanDetails: DayPlan[]) => {
        setPlan((prevPlan) => {
            if (!prevPlan) return null
            return {
                ...prevPlan,
                plan_details: newPlanDetails,
            }
        })
    }

    const handleRegeneratePlan = async () => {
        if (!plan) return
        setIsGenerating(true)
        setError('')
        try {
            const res = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...plan,
                    dates: { start: plan.start_date, end: plan.end_date },
                    interests: plan.interests || [],
                }),
            })
            const data = await res.json()
            if (!data.success) {
                throw new Error(data.error || '일정 생성에 실패했습니다.')
            }
            setPlan((prevPlan) => ({
                ...prevPlan!,
                plan_details: data.plan,
            }))
        } catch (err: any) {
            setError(err.message)
            alert(err.message)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSave = async () => {
        if (!id || !plan) return
        setIsSaving(true)
        setError('')
        try {
            const res = await fetch(`/api/plans/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: plan.title,
                    destination: plan.destination,
                    start_date: plan.start_date,
                    end_date: plan.end_date,
                    travelers: plan.travelers,
                    budget: plan.budget,
                    status: plan.status,
                    plan_details: plan.plan_details,
                }),
            })
            const data = await res.json()
            if (!data.success) {
                throw new Error(data.error || '저장에 실패했습니다.')
            }
            alert('성공적으로 저장되었습니다!')
            router.push(`/my-plans/${id}`)
        } catch (err: any) {
            setError(err.message)
            alert(`저장 실패: ${err.message}`)
        } finally {
            setIsSaving(false)
        }
    }

    if (loading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>
    if (error && !plan)
        return <div className="flex justify-center items-center h-screen text-red-500">에러: {error}</div>
    if (!plan) return <div className="flex justify-center items-center h-screen">해당 계획을 찾을 수 없습니다.</div>

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-4">
                    <Link href={`/my-plans/${id}`} className="text-blue-600 hover:underline">
                        &larr; 수정 취소하고 돌아가기
                    </Link>
                </div>

                <textarea
                    name="title"
                    value={plan.title || ''}
                    onChange={handleInputChange}
                    className="w-full text-4xl font-bold text-gray-900 bg-transparent border-2 border-dashed border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 resize-none"
                    rows={1}
                />

                <div className="bg-white rounded-xl shadow-md p-8 mt-8">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">여행 계획 요약</h2>
                        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                            <div className="grid grid-cols-3 items-center">
                                <label className="font-semibold">🗺 여행지:</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={plan.destination || ''}
                                    onChange={handleInputChange}
                                    className="col-span-2 p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <label className="font-semibold">📆 시작일:</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={plan.start_date || ''}
                                    onChange={handleInputChange}
                                    className="col-span-2 p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <label className="font-semibold">📆 종료일:</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={plan.end_date || ''}
                                    onChange={handleInputChange}
                                    className="col-span-2 p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <label className="font-semibold">👥 인원:</label>
                                <input
                                    type="number"
                                    name="travelers"
                                    value={plan.travelers || 1}
                                    onChange={handleInputChange}
                                    className="col-span-2 p-2 border rounded-md"
                                    min="1"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <label className="font-semibold">💰 예산:</label>
                                <select
                                    name="budget"
                                    value={plan.budget || ''}
                                    onChange={handleInputChange}
                                    className="col-span-2 p-2 border rounded-md bg-white"
                                >
                                    {Object.entries(budgetMap).map(([key, value]) => (
                                        <option key={key} value={key}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <label className="font-semibold">🔄 상태:</label>
                                <select
                                    name="status"
                                    value={plan.status || 'planning'}
                                    onChange={handleInputChange}
                                    className="col-span-2 p-2 border rounded-md bg-white"
                                >
                                    <option value="planning">계획 중</option>
                                    <option value="confirmed">확정됨</option>
                                    <option value="completed">완료됨</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="my-10 text-center border-t border-b border-gray-200 py-6">
                        <button
                            onClick={handleRegeneratePlan}
                            disabled={isGenerating}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400"
                        >
                            {isGenerating ? 'AI 일정 생성 중...' : 'AI 일정 다시 생성하기'}
                        </button>
                        <p className="text-sm text-gray-500 mt-2">
                            현재 요약 정보를 바탕으로 AI가 상세 일정을 다시 생성합니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">맞춤 일정 (AI 생성)</h2>
                        {isGenerating && (
                            <p className="text-center text-blue-500">새로운 일정을 생성하고 있습니다...</p>
                        )}
                        {!isGenerating && plan.plan_details && plan.plan_details.length > 0 ? (
                            <MyPlanEditor
                                loading={isGenerating}
                                generatedPlan={plan.plan_details}
                                setGeneratedPlan={handlePlanDetailsChange}
                            />
                        ) : (
                            !isGenerating && (
                                <p className="text-gray-500 text-center py-8">생성된 상세 일정이 없습니다.</p>
                            )
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full max-w-xs bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSaving ? '저장 중...' : '변경사항 저장하기'}
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    )
}
