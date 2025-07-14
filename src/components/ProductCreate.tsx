'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductFormData {
    title: string
    description: string
    price: number
    location: string
    duration: string
    category: string
    highlights: string[]
    itinerary: string
}

export default function ProductCreate() {
    const router = useRouter()
    const [formData, setFormData] = useState<ProductFormData>({
        title: '',
        description: '',
        price: 0,
        location: '',
        duration: '',
        category: '국내여행',
        highlights: [''],
        itinerary: '',
    })

    const [showSuccess, setShowSuccess] = useState(false)

    const categories = ['국내여행', '해외여행', '문화체험', '도시여행', '자연체험']

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value,
        }))
    }

    const handleHighlightChange = (index: number, value: string) => {
        const newHighlights = [...formData.highlights]
        newHighlights[index] = value
        setFormData((prev) => ({ ...prev, highlights: newHighlights }))
    }

    const addHighlight = () => {
        setFormData((prev) => ({
            ...prev,
            highlights: [...prev.highlights, ''],
        }))
    }

    const removeHighlight = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            highlights: prev.highlights.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('상품 생성:', formData)
        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
            router.push('/products')
        }, 2000)
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">새 여행 상품 등록</h1>
                <p className="text-gray-600">고객들에게 제공할 여행 상품을 등록해주세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">상품명 *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="여행 상품명을 입력하세요"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer pr-8"
                                required
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">여행지 *</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="예: 제주도, 부산, 서울"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">여행 기간 *</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="예: 2박 3일, 3박 4일"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">가격 (원) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">상품 설명 *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="상품에 대한 자세한 설명을 입력하세요"
                            maxLength={500}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500자</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">상품 특징</h2>

                    <div className="space-y-3">
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="상품의 특징이나 하이라이트를 입력하세요"
                                />
                                {formData.highlights.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeHighlight(index)}
                                        className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addHighlight}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                            <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-add-line"></i>
                            </div>
                            특징 추가
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">여행 일정</h2>

                    <textarea
                        name="itinerary"
                        value={formData.itinerary}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="1일차: 인천공항 출발 → 제주공항 도착&#10;2일차: 한라산 등반 → 성산일출봉&#10;3일차: 우도 관광 → 제주공항 출발"
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.itinerary.length}/500자</p>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                        상품 등록
                    </button>
                </div>
            </form>

            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                        <div className="text-center">
                            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                                <i className="ri-check-line text-green-600 text-xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">등록 완료</h3>
                            <p className="text-gray-600">상품이 성공적으로 등록되었습니다.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
