'use client'
import { useState } from 'react'

interface ReviewFormData {
    rating: number
    comment: string
    images: File[]
}

interface ReviewCreateProps {
    productId: string
    onSubmit?: (review: ReviewFormData) => void
    onCancel?: () => void
}

export default function ReviewCreate({ productId, onSubmit, onCancel }: ReviewCreateProps) {
    const [formData, setFormData] = useState<ReviewFormData>({
        rating: 0,
        comment: '',
        images: [],
    })
    const [hoveredRating, setHoveredRating] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleRatingClick = (rating: number) => {
        setFormData((prev) => ({ ...prev, rating }))
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, comment: e.target.value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files].slice(0, 5) }))
    }

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.rating === 0) {
            return
        }

        console.log('리뷰 작성:', { productId, ...formData })
        if (onSubmit) {
            onSubmit(formData)
        }

        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
            setFormData({ rating: 0, comment: '', images: [] })
        }, 2000)
    }

    const renderStars = () => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                    >
                        <i
                            className={`ri-star-${
                                star <= (hoveredRating || formData.rating) ? 'fill' : 'line'
                            } text-2xl ${
                                star <= (hoveredRating || formData.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        ></i>
                    </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">{formData.rating > 0 && `${formData.rating}점`}</span>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">리뷰 작성</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">별점 평가 *</label>
                        {renderStars()}
                        {formData.rating === 0 && <p className="text-sm text-red-500 mt-1">별점을 선택해주세요</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">리뷰 내용 *</label>
                        <textarea
                            value={formData.comment}
                            onChange={handleCommentChange}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="여행 경험을 자세히 알려주세요. 다른 여행자들에게 도움이 되는 솔직한 후기를 남겨주세요."
                            maxLength={500}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.comment.length}/500자</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">사진 첨부 (최대 5장)</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="w-4 h-4 flex items-center justify-center">
                                        <i className="ri-camera-line text-gray-600"></i>
                                    </div>
                                    <span className="text-sm text-gray-700">사진 선택</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                                <span className="text-xs text-gray-500">JPG, PNG 파일만 업로드 가능합니다</span>
                            </div>

                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`업로드 이미지 ${index + 1}`}
                                                className="w-full h-24 object-cover object-top rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {onCancel && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                            >
                                취소
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={formData.rating === 0 || !formData.comment.trim()}
                            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
                        >
                            리뷰 등록
                        </button>
                    </div>
                </form>
            </div>

            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                        <div className="text-center">
                            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                                <i className="ri-check-line text-green-600 text-xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">리뷰 등록 완료</h3>
                            <p className="text-gray-600">소중한 후기 감사합니다!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
