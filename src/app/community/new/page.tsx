'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { supabaseBrowser } from '@/lib/supabase-browser'

export default function NewPostPage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('review')
    const router = useRouter()
    const [destinations, setDestinations] = useState<{ id: number; name: string }[]>([])
    const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState<string[]>([])

    const fetchDestinations = async () => {
        const { data, error } = await supabase.from('destination').select('id, name')
        if (error) {
            console.error('여행지 목록 불러오기 실패:', error)
        } else {
            setDestinations(data || [])
        }
    }

    useEffect(() => {
        fetchDestinations()
    }, [])

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            const value = tagInput.trim()
            if (value && !tags.includes(value)) {
                setTags((prev) => [...prev, value])
            }
            setTagInput('')
        }
    }

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag))
    }

    const handleSubmit = async () => {
        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser()

        if (!user) {
            alert('로그인이 필요합니다.')
            return
        }

        let fileUrl = ''
        let fileType = 'image'
        let filePath = ''

        if (imageFile) {
            const ext = imageFile.name.split('.').pop()
            const timestamp = Date.now()
            const isVideo = imageFile.type.startsWith('video/')
            const bucket = 'review-images'
            filePath = `${'uploads'}/${timestamp}.${ext}`

            isVideo ? (fileType = 'video') : (fileType = 'image')

            const { error: uploadError } = await supabase.storage.from(`review-images`).upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false,
                contentType: imageFile.type,
            })

            if (uploadError) {
                console.error(`${isVideo ? '영상' : '이미지'} 업로드 실패:`, uploadError)
                return
            }

            const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

            fileUrl = publicUrlData.publicUrl
        }

        const { data: userData, error: userError } = await supabase
            .from('user')
            .select('id, username')
            .eq('auth_id', user.id)
            .single()

        if (userError || !userData) {
            console.error('유저 테이블 조회 실패:', userError)
            return
        }

        const { data, error: insertError } = await supabase
            .from('review')
            .insert({
                title,
                content,
                location: destinations.find((d) => d.id === selectedDestinationId)?.name || '선택되지 않음',
                type,
                author: userData.username || '익명',
                date: new Date().toISOString(),
                views: 0,
                likes: 0,
                comments: 0,
                file_type: fileType, // 'image' 또는 'video'
                file_path: filePath, // 업로드된 파일 경로
                user_id: userData.id,
                destination_id: selectedDestinationId, // 임시로 3번 여행지로 설정
                file_url: fileUrl || null,
            })
            .select()

        if (insertError || !data || data.length === 0) {
            console.error('글 작성 실패:', insertError)
            return
        }

        const { error: tagError } = await supabase.from('review_tag').insert(
            tags.map((tag) => ({
                review_id: data[0].id,
                name: tag,
            })),
        )

        if (tagError) {
            console.error('태그 저장 실패:', tagError)
            return
        }

        alert('글이 등록되었습니다!')
        router.push('/community')
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold mb-6">글쓰기</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="태그를 입력하고 Enter 또는 , 입력"
                    className="w-full border border-gray-300 p-2 rounded"
                />
                <div className="flex gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm cursor-pointer"
                            onClick={() => removeTag(tag)}
                        >
                            #{tag} ✕
                        </span>
                    ))}
                </div>
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full border border-gray-300 p-3 rounded"
                />
                <select
                    value={selectedDestinationId ?? ''}
                    onChange={(e) => setSelectedDestinationId(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                    <option value="" disabled>
                        여행지를 선택하세요
                    </option>
                    {destinations.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                            {destination.name}
                        </option>
                    ))}
                </select>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded"
                >
                    <option value="review">여행후기</option>
                    <option value="question">질문</option>
                    <option value="tip">팁</option>
                    <option value="companion">동행구인</option>
                </select>
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="block"
                />
                <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                    등록
                </button>
            </div>
        </div>
    )
}
