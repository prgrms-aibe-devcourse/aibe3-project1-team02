// components/CommunityCard.tsx
'use client'

import React from 'react'
import { Review } from '@/types/community'
import { useRouter } from 'next/navigation'

interface CommunityCardProps {
    post: Review
    currentUserId: number | null
    onDelete: (post: Review, postId: number) => void
}

export default function CommunityCard({ post, currentUserId, onDelete }: CommunityCardProps) {
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/community/${post.id}`)
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'review':
                return '여행후기'
            case 'question':
                return '질문'
            case 'tip':
                return '팁'
            case 'companion':
                return '동행구인'
            default:
                return ''
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'review':
                return 'bg-blue-100 text-blue-800'
            case 'question':
                return 'bg-green-100 text-green-800'
            case 'tip':
                return 'bg-purple-100 text-purple-800'
            case 'companion':
                return 'bg-orange-100 text-orange-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex items-start gap-4">
                <img
                    src={post.user?.profile_image}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover object-top"
                />

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                                {getTypeLabel(post.type)}
                            </span>
                            <span className="text-sm text-gray-600">{post.location}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-400">{post.date}</span>
                        </div>

                        {post.user_id === currentUserId && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    onDelete(post, post.id)
                                }}
                                className="text-red-500 hover:underline text-sm"
                            >
                                삭제
                            </button>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {post.file_url && post.file_type === 'image' && (
                            <img
                                src={post.file_url}
                                alt="Post image"
                                className="w-full max-w-md max-h-96 rounded-xl object-cover"
                            />
                        )}

                        {post.file_url && post.file_type === 'video' && (
                            <video src={post.file_url} className="w-full max-w-md max-h-96 rounded-xl object-cover" />
                        )}
                    </div>

                    <div className="flex gap-2 flex-wrap mb-2">
                        {post.review_tag?.map((tag, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                #{tag.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span className="font-medium">{post.author}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <i className="ri-eye-line text-xs"></i>
                                <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="ri-heart-line text-xs"></i>
                                <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="ri-chat-3-line text-xs"></i>
                                <span>{post.comments}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
