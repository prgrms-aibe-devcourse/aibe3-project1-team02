'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase-browser'
import TravelPlanEditor from '@/components/TravelPlanEditor'

export default function PlannerPage() {
    const router = useRouter()
    const [generatedPlan, setGeneratedPlan] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentStep, setCurrentStep] = useState(1)
    const [editingPlan, setEditingPlan] = useState<any[]>([])
    const [isEditing, setIsEditing] = useState(false)

    const [planData, setPlanData] = useState<{
        destination: string
        dates: { start: string; end: string }
        travelers: number
        budget: string
        interests: string[]
        progress: number
    }>({
        destination: '',
        dates: { start: '', end: '' },
        travelers: 1,
        budget: '',
        interests: [],
        progress: 0,
    })

    const steps = [
        { id: 1, title: '여행지 선택', icon: 'ri-map-pin-line' },
        { id: 2, title: '일정 설정', icon: 'ri-calendar-line' },
        { id: 3, title: '취향 선택', icon: 'ri-heart-line' },
        { id: 4, title: '완성', icon: 'ri-check-line' },
    ]

    const destinations = [
        {
            name: '제주도',
            country: '대한민국',
            image: 'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20with%20Hallasan%20mountain%20and%20emerald%20sea%2C%20peaceful%20Korean%20island%20landscape%20with%20traditional%20stone%20walls%20and%20natural%20beauty&width=300&height=200&seq=jeju-plan-1&orientation=landscape',
        },
        {
            name: '부산',
            country: '대한민국',
            image: 'https://readdy.ai/api/search-image?query=Busan%20coastal%20city%20with%20colorful%20Gamcheon%20village%20and%20beautiful%20beaches%2C%20vibrant%20Korean%20seaside%20destination%20with%20modern%20and%20traditional%20elements&width=300&height=200&seq=busan-plan-2&orientation=landscape',
        },
        {
            name: '도쿄',
            country: '일본',
            image: 'https://readdy.ai/api/search-image?query=Tokyo%20cityscape%20with%20cherry%20blossoms%20and%20modern%20skyscrapers%2C%20bustling%20Japanese%20metropolitan%20city%20with%20cultural%20landmarks%20and%20vibrant%20street%20life&width=300&height=200&seq=tokyo-plan-3&orientation=landscape',
        },
        {
            name: '파리',
            country: '프랑스',
            image: 'https://readdy.ai/api/search-image?query=Paris%20romantic%20cityscape%20with%20Eiffel%20Tower%20and%20Seine%20river%2C%20elegant%20French%20capital%20with%20classic%20architecture%20and%20charming%20atmosphere&width=300&height=200&seq=paris-plan-4&orientation=landscape',
        },
    ]

    const interests = [
        { id: 'nature', name: '자연/힐링', icon: 'ri-leaf-line' },
        { id: 'culture', name: '문화/역사', icon: 'ri-building-4-line' },
        { id: 'food', name: '맛집/음식', icon: 'ri-restaurant-line' },
        { id: 'shopping', name: '쇼핑', icon: 'ri-shopping-bag-line' },
        { id: 'adventure', name: '모험/액티비티', icon: 'ri-mountain-line' },
        { id: 'nightlife', name: '나이트라이프', icon: 'ri-moon-line' },
        { id: 'photography', name: '사진/인스타', icon: 'ri-camera-line' },
        { id: 'relaxation', name: '휴식/스파', icon: 'ri-spa-line' },
    ]

    const handleInterestToggle = (interestId: string) => {
        setPlanData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interestId)
                ? prev.interests.filter((id) => id !== interestId)
                : [...prev.interests, interestId],
        }))
    }

    const nextStep = () => {
        if (currentStep < 4) {
            const next = currentStep + 1
            const newProgress = next === 4 ? 100 : (next - 1) * 25
            setPlanData((prev) => ({ ...prev, progress: newProgress }))
            setCurrentStep(next)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            const prev = currentStep - 1
            const newProgress = (prev - 1) * 25
            setPlanData((p) => ({ ...p, progress: newProgress }))
            setCurrentStep(prev)
        }
    }

    const handleGeneratePlan = async () => {
        setLoading(true)
        setError('')
        setGeneratedPlan([])
        setEditingPlan([])
        setIsEditing(false)
        try {
            const res = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData),
            })
            const data = await res.json()
            if (!data.success) throw new Error(data.error || '일정 생성 실패')
            setGeneratedPlan(data.plan)
            setEditingPlan(data.plan)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleEditPlan = () => {
        setEditingPlan(generatedPlan.map((day) => ({ ...day })))
        setIsEditing(true)
    }

    const handleSaveEditedPlan = () => {
        setGeneratedPlan(editingPlan.map((day) => ({ ...day })))
        setIsEditing(false)
    }

    const handleEditDayField = (idx: number, field: 'morning' | 'afternoon' | 'evening', value: string) => {
        setEditingPlan((prev) => prev.map((day, i) => (i === idx ? { ...day, [field]: value } : day)))
    }

    const handleSavePlan = async () => {
        try {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser()
            console.log('savePlan user:', user, error)
            if (!user) {
                alert('로그인이 필요합니다.')
                return
            }

            const planToSave = { ...planData, user_id: user.id }

            const res = await fetch('/api/plans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...planToSave, planDetails: generatedPlan }),
            })

            const result = await res.json()
            if (result.success) {
                alert('여행 계획이 저장되었습니다!')
                router.push('/my-plans')
            } else {
                alert(`저장 실패: ${result.error}`)
            }
        } catch (err) {
            alert('저장 중 오류가 발생했습니다.')
            console.error('Plan Save Error:', err)
        }
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">여행 계획 만들기</h1>
                    <p className="text-xl text-blue-100">맞춤형 여행 일정을 손쉽게 계획해보세요</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-center mb-12">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                                    currentStep >= step.id
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-400'
                                }`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <i className={`${step.icon} text-lg`}></i>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`w-16 h-1 mx-2 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'}`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                어디로 떠나고 싶으세요?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {destinations.map((dest, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setPlanData((prev) => ({ ...prev, destination: dest.name }))}
                                        className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
                                            planData.destination === dest.name
                                                ? 'ring-4 ring-blue-500 transform scale-105'
                                                : 'hover:shadow-lg'
                                        }`}
                                    >
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-full h-48 object-cover object-top"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold">{dest.name}</h3>
                                            <p className="text-sm opacity-90">{dest.country}</p>
                                        </div>
                                        {planData.destination === dest.name && (
                                            <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-2">
                                                <div className="w-4 h-4 flex items-center justify-center">
                                                    <i className="ri-check-line text-sm"></i>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                언제, 몇 명이서 떠나시나요?
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">출발일</label>
                                        <input
                                            type="date"
                                            value={planData.dates.start}
                                            onChange={(e) =>
                                                setPlanData((prev) => ({
                                                    ...prev,
                                                    dates: { ...prev.dates, start: e.target.value },
                                                }))
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">도착일</label>
                                        <input
                                            type="date"
                                            value={planData.dates.end}
                                            onChange={(e) =>
                                                setPlanData((prev) => ({
                                                    ...prev,
                                                    dates: { ...prev.dates, end: e.target.value },
                                                }))
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">여행 인원</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                setPlanData((prev) => ({
                                                    ...prev,
                                                    travelers: Math.max(1, prev.travelers - 1),
                                                }))
                                            }
                                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                                        >
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                <i className="ri-subtract-line text-sm"></i>
                                            </div>
                                        </button>
                                        <span className="text-xl font-semibold w-12 text-center">
                                            {planData.travelers}명
                                        </span>
                                        <button
                                            onClick={() =>
                                                setPlanData((prev) => ({ ...prev, travelers: prev.travelers + 1 }))
                                            }
                                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                                        >
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                <i className="ri-add-line text-sm"></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">예산 (1인당)</label>
                                    <select
                                        value={planData.budget}
                                        onChange={(e) => setPlanData((prev) => ({ ...prev, budget: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                                    >
                                        <option value="">예산을 선택해주세요</option>
                                        <option value="low">50만원 이하</option>
                                        <option value="medium">50-100만원</option>
                                        <option value="high">100-200만원</option>
                                        <option value="luxury">200만원 이상</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                어떤 여행을 좋아하시나요?
                            </h2>
                            <p className="text-gray-600 text-center mb-8">
                                관심 있는 항목을 모두 선택해주세요 (다중 선택 가능)
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {interests.map((interest) => (
                                    <button
                                        key={interest.id}
                                        onClick={() => handleInterestToggle(interest.id)}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                            planData.interests.includes(interest.id)
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                        }`}
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                                            <i className={`${interest.icon} text-2xl`}></i>
                                        </div>
                                        <p className="text-sm font-medium text-center">{interest.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <TravelPlanEditor
                            planData={planData}
                            interests={interests}
                            loading={loading}
                            error={error}
                            generatedPlan={generatedPlan}
                            setGeneratedPlan={setGeneratedPlan}
                            handleGeneratePlan={handleGeneratePlan}
                            handleSavePlan={handleSavePlan}
                        />
                    )}
                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap ${
                                currentStep === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            이전
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={currentStep === 4}
                            className={`px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap ${
                                currentStep === 4
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {currentStep === 4 ? '완료' : '다음'}
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
