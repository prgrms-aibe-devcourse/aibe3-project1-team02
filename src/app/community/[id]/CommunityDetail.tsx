'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Review, Comment } from '@/types/community'
import { supabase } from '@/lib/supabase'

interface CommunityDetailProps {
    postId: string
}

export default function CommunityDetail({ postId }: CommunityDetailProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [newComment, setNewComment] = useState('')

    const [post, setPost] = useState<Review>()
    const [comments, setComments] = useState<Comment[]>([])
    const [profileImage, setProfileImage] = useState<string | null>(null)

    const fetchData = async () => {
        let { data: post, error } = await supabase
            .from('review')
            .select(
                `
        *,
        user: user (
          profile_image
        )
      `,
            )
            .eq('id', postId)
            .single()
        setPost(post)

        if (error) {
            console.error('Error fetching posts:', error)
        }

        let { data: comments, error: commentsError } = await supabase
            .from('review_comments')
            .select(
                `*,
          user: user (
            username,
            profile_image
        )`,
            )
            .eq('review_id', postId)
            .order('created_at', { ascending: false })
        setComments(comments || [])

        if (commentsError) {
            console.error('Error fetching comments:', commentsError)
        }

        const { error: updateError } = await supabase
            .from('review')
            .update({ views: post.views + 1 })
            .eq('id', postId)

        setPost({ ...post, views: post.views + 1 })
        if (updateError) {
            console.error('조회수 증가 실패', updateError)
        }
    }

    const fetchUserProfile = async () => {
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) return

        const { data: userData, error } = await supabase
            .from('user')
            .select('profile_image')
            .eq('auth_id', user.id)
            .single()

        if (!error && userData?.profile_image) {
            setProfileImage(userData.profile_image)
        }
    }

    useEffect(() => {
        fetchData()
        fetchUserProfile()
    }, [])

    if (!post || !comments) {
        return <div className="text-center py-10">로딩 중...</div>
    }

    // const comments = [
    //     {
    //         id: 1,
    //         author: '일본여행고수',
    //         avatar: 'https://readdy.ai/api/search-image?query=Experienced%20Japanese%20traveler%20with%20friendly%20smile%2C%20casual%20travel%20outfit%2C%20knowledgeable%20and%20helpful%20appearance&width=50&height=50&seq=comment-avatar-1&orientation=squarish',
    //         date: '2024-01-15',
    //         content:
    //             '7일 일정이면 JR패스 사는 게 맞아요! 도쿄-오사카만 왕복해도 거의 본전이고, 교토까지 가면 확실히 이득입니다. 개별 티켓은 더 비싸요.',
    //         likes: 12,
    //         replies: [
    //             {
    //                 id: 11,
    //                 author: post.author,
    //                 avatar: post.user?.profile_image,
    //                 date: '2024-01-15',
    //                 content:
    //                     post.type === 'review'
    //                         ? '롯데렌터카에서 빌렸어요! 가격도 괜찮고 차량 상태도 좋았습니다 👍'
    //                         : '정말 그런가요? 그럼 JR패스로 결정해야겠네요. 감사합니다!',
    //                 likes: 3,
    //             },
    //         ],
    //     },
    //     // {
    //     //     id: 2,
    //     //     author: '여행매니아',
    //     //     avatar: 'https://readdy.ai/api/search-image?query=Travel%20enthusiast%20with%20bright%20smile%2C%20backpack%20and%20travel%20gear%2C%20adventurous%20and%20energetic%20personality&width=50&height=50&seq=comment-avatar-2&orientation=squarish',
    //     //     date: '2024-01-14',
    //     //     content:
    //     //         post.type === 'review'
    //     //             ? '사진도 너무 예쁘게 찍으셨네요! 특히 성산일출봉 사진이 정말 멋져요. 카메라는 뭐 쓰셨나요?'
    //     //             : 'IC카드(Suica, Pasmo)도 추천해요! 지하철이나 버스 탈 때 편리하고, 편의점에서도 결제 가능합니다.',
    //     //     likes: 8,
    //     //     replies: [],
    //     // },
    //     // {
    //     //     id: 3,
    //     //     author: post.type === 'review' ? '제주도토박이' : '도쿄거주자',
    //     //     avatar: 'https://readdy.ai/api/search-image?query=Local%20resident%20with%20warm%20and%20welcoming%20expression%2C%20casual%20outfit%2C%20helpful%20and%20knowledgeable%20appearance&width=50&height=50&seq=comment-avatar-3&orientation=squarish',
    //     //     date: '2024-01-14',
    //     //     content:
    //     //         post.type === 'review'
    //     //             ? '제주 현지인으로서 gerçekten 잘 다녀가신 것 같아요! 다음에 오시면 더 숨겨진 맛집들도 알려드릴게요 ㅎㅎ'
    //     //             : '도쿄 살고 있는데, 관광지 많이 다니실 거면 JR패스가 확실히 경제적이에요. 특히 야마노테선 자주 타게 될 텐데 JR패스면 무제한이거든요.',
    //     //     likes: 15,
    //     //     replies: [],
    //     // },
    // ]

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

    const handleSubmitComment = async () => {
        if (!newComment.trim() || !post?.id) return

        const {
            data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
            alert('로그인이 필요합니다.')
            return
        }

        const { data: userData, error: userError } = await supabase
            .from('user')
            .select('id')
            .eq('auth_id', authUser.id)
            .single()

        if (userError || !userData) {
            console.error('유저 테이블 조회 실패:', userError)
            return
        }

        const { data, error } = await supabase
            .from('review_comments')
            .insert({
                body: newComment,
                review_id: post.id,
                user_id: userData.id,
            })
            .select(`*, user: user (username, profile_image)`)

        if (error) {
            console.error('댓글 작성 실패:', error)
            return
        }

        const { error: updateError } = await supabase
            .from('review')
            .update({
                comments: post.comments + 1,
            })
            .eq('id', post.id)

        if (updateError) {
            console.error('댓글 수 업데이트 실패:', updateError)
        }

        if (data && data.length > 0) {
            setComments([data[0], ...comments])
            setNewComment('')
            setPost((prev) => prev && { ...prev, comments: prev.comments + 1 })
        }
    }
    const handleLike = async () => {
        const newLiked = !isLiked
        setIsLiked(newLiked) // UI 반영 먼저

        const updatedLikes = post.likes + (newLiked ? 1 : -1)

        const { error } = await supabase.from('review').update({ likes: updatedLikes }).eq('id', post.id)

        if (error) {
            console.error('좋아요 업데이트 실패:', error)
            // 실패 시 UI 롤백도 가능
            setIsLiked(!newLiked)
        } else {
            setPost({ ...post, likes: updatedLikes }) // UI에 반영
        }
    }

    // const handleCommentLike = async (comment: Comment) => {
    //     const newLiked = !isLiked
    //     setIsLiked(newLiked)

    //     const updatedLikes = comment.likes + (newLiked ? 1 : -1)

    //     // UI 먼저 업데이트
    //     setComments((prev) =>
    //         prev.map((c) => (c.id === comment.id ? { ...c, likes: updatedLikes, isLiked: newLiked } : c)),
    //     )

    //     const { error } = await supabase.from('review_comments').update({ likes: updatedLikes }).eq('id', comment.id)

    //     if (error) {
    //         console.error('좋아요 업데이트 실패:', error)
    //         // 롤백
    //         setComments((prev) =>
    //             prev.map((c) => (c.id === comment.id ? { ...c, likes: comment.likes, isLiked: !newLiked } : c)),
    //         )
    //     }
    // }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="flex items-center gap-2 text-sm mb-6 text-gray-600">
                    <Link href="/community" className="hover:text-blue-600">
                        여행후기
                    </Link>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                        {getTypeLabel(post.type)}
                    </span>
                </nav>

                <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={post.user?.profile_image}
                                alt={post.author}
                                className="w-12 h-12 rounded-full object-cover object-top"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-medium text-gray-900">{post.author}</span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                            post.type,
                                        )}`}
                                    >
                                        {getTypeLabel(post.type)}
                                    </span>
                                    <span className="text-sm text-gray-500">{post.location}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>{post.date}</span>
                                    <span>조회 {post.views.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

                        <div className="prose max-w-none mb-6">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</div>
                        </div>
                        {/* 
                        {post.images && post.images.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                {post.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-48 object-cover object-top rounded-lg"
                                    />
                                ))}
                            </div>
                        )} */}

                        {/* <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div> */}

                        <div className="flex items-center justify-between py-4 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                        isLiked
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                        <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'} text-sm`}></i>
                                    </div>
                                    좋아요 {post.likes}
                                </button>

                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                        isBookmarked
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                        <i
                                            className={`${
                                                isBookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'
                                            } text-sm`}
                                        ></i>
                                    </div>
                                    북마크
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
                                    <div className="w-4 h-4 flex items-center justify-center">
                                        <i className="ri-share-line text-sm"></i>
                                    </div>
                                    공유
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="mt-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">댓글 {post.comments}개</h3>

                        <div className="mb-6">
                            <div className="flex gap-3">
                                <img
                                    src={profileImage || '/default-profile.png'}
                                    alt="내 프로필"
                                    className="w-10 h-10 rounded-full object-cover object-top"
                                />
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="댓글을 남겨보세요..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                                        rows={3}
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={handleSubmitComment}
                                            disabled={!newComment.trim()}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap text-sm"
                                        >
                                            댓글 작성
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="border-l-2 border-gray-100 pl-4">
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={comment.user?.profile_image}
                                            alt={comment.user?.username}
                                            className="w-10 h-10 rounded-full object-cover object-top"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900">
                                                    {comment.user?.username}
                                                </span>
                                                <span className="text-sm text-gray-500">{comment.created_at}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm mb-2">{comment.body}</p>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleCommentLike(comment)}
                                                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 cursor-pointer"
                                                >
                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                        <i className="ri-thumb-up-line text-xs"></i>
                                                    </div>
                                                    {comment.likes}
                                                </button>
                                                <button className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                                                    답글
                                                </button>
                                            </div>

                                            {/* {comment.replies && comment.replies.length > 0 && (
                                                <div className="mt-4 space-y-3">
                                                    {comment.replies.map((reply) => (
                                                        <div
                                                            key={reply.id}
                                                            className="flex items-start gap-3 pl-4 border-l border-gray-200"
                                                        >
                                                            <img
                                                                src={reply.avatar}
                                                                alt={reply.author}
                                                                className="w-8 h-8 rounded-full object-cover object-top"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="font-medium text-gray-900 text-sm">
                                                                        {reply.author}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {reply.date}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-700 text-sm mb-1">
                                                                    {reply.content}
                                                                </p>
                                                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                                        <i className="ri-thumb-up-line text-xs"></i>
                                                                    </div>
                                                                    {reply.likes}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
