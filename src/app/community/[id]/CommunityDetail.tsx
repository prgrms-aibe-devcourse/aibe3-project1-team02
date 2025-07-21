'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Review, Comment } from '@/types/community'
import { supabase } from '@/lib/supabase'
import { supabaseBrowser } from '@/lib/supabase-browser'

interface CommunityDetailProps {
    postId: string
}

export default function CommunityDetail({ postId }: CommunityDetailProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [newComment, setNewComment] = useState('')

    const [post, setPost] = useState<Review>()
    const [comments, setComments] = useState<Comment[]>([])
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const [currentUserId, setCurrentUserId] = useState<number | null>(null)

    const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null)
    const [replyContent, setReplyContent] = useState('')

    const [tags, setTags] = useState<string[]>([])

    function nestComments(flatComments: Comment[]): Comment[] {
        const commentMap: { [id: number]: Comment } = {}
        const nested: Comment[] = []

        flatComments.forEach((comment) => {
            commentMap[comment.id] = { ...comment, replies: [] } // 👈 replies 직접 넣어줌
        })

        flatComments.forEach((comment) => {
            if (comment.parent_id) {
                commentMap[comment.parent_id]?.replies?.push(commentMap[comment.id])
            } else {
                nested.push(commentMap[comment.id])
            }
        })

        return nested
    }

    const fetchUserData = async () => {
        const {
            data: { user },
            error: authError,
        } = await supabaseBrowser.auth.getUser()

        if (authError || !user) return

        const { data: userData, error } = await supabase
            .from('user')
            .select('profile_image, id')
            .eq('auth_id', user.id)
            .single()

        if (!error && userData?.profile_image) {
            setProfileImage(userData.profile_image)
        }
        setCurrentUserId(userData?.id ?? null)
    }

    const fetchData = async () => {
        let { data: post, error } = await supabase
            .from('review')
            .select(
                `*,
            user: user (
            profile_image
        )`,
            )
            .eq('id', postId)
            .single()

        if (error) {
            console.error('Error fetching posts:', error)
        }
        setPost(post)

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
        setComments(nestComments(comments || []))

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

    const fetchTags = async () => {
        const { data, error } = await supabase.from('review_tag').select('name').eq('review_id', postId)

        if (error) {
            console.error('태그 불러오기 실패:', error)
        } else {
            setTags(data.map((tag) => tag.name))
        }
    }

    const fetchLikes = async () => {
        if (!currentUserId || !post) return

        const { data: likes, error } = await supabase
            .from('likes')
            .select('*')
            .eq('user_id', currentUserId)
            .eq('target_id', post.id)
            .eq('type', 'review')
            .maybeSingle()

        if (error) {
            console.error('Error fetching likes:', error)
        } else {
            setIsLiked(likes ? true : false)
        }
    }

    useEffect(() => {
        fetchUserData()
        fetchData()
        fetchTags()
    }, [])

    //post와 currentUserId가 세팅된 이후에만 fetchLikes()가 실행
    useEffect(() => {
        if (post?.id && currentUserId) {
            fetchLikes()
        }
    }, [post, currentUserId])

    if (!post || !comments) {
        return <div className="text-center py-10">로딩 중...</div>
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

    const handleSubmitComment = async (parentId?: number) => {
        //if (!newComment.trim() || !post?.id || !replyContent.trim()) return

        const {
            data: { user: authUser },
        } = await supabaseBrowser.auth.getUser()

        if (!authUser) {
            alert('로그인이 필요합니다.')
            return
        }

        const { data, error } = await supabase
            .from('review_comments')
            .insert({
                body: parentId ? replyContent : newComment,
                review_id: post.id,
                user_id: currentUserId,
                parent_id: parentId || null,
            })
            .select(`*, user: user (username, profile_image)`)

        if (error) {
            console.error('댓글 작성 실패:', error)
            return
        }

        // fetchComment를 따로 분리시켜야 더 좋을 듯 합니다.

        const { error: updateError } = await supabase
            .from('review')
            .update({
                comments: post.comments + 1,
            })
            .eq('id', post.id)

        fetchData()

        console.log('댓글 수 업데이트:', post.comments + 1)

        if (updateError) {
            console.error('댓글 수 업데이트 실패:', updateError)
        }

        if (data && data.length > 0) {
            setComments([data[0], ...comments])
            setNewComment('')
            setPost((prev) => prev && { ...prev, comments: prev.comments + 1 })
        }

        setReplyContent('')
        setReplyToCommentId(null)
    }

    const handleDelete = async (commentId: number) => {
        const { count, error } = await supabase
            .from('review_comments')
            .select('*', { count: 'exact', head: true }) // head: true는 데이터를 가져오지 않고 카운트만
            .eq('parent_id', commentId)

        console.log('대댓글 개수:', count || 0)

        const { error: childCommentError } = await supabase.from('review_comments').delete().eq('parent_id', commentId)

        if (childCommentError) {
            console.error('답글 삭제 실패:', childCommentError)
            return
        }
        const { error: commentError } = await supabase.from('review_comments').delete().eq('id', commentId)

        if (commentError) {
            console.error('댓글 삭제 실패:', commentError)
            return
        } else {
            alert('댓글 삭제 완료!')
        }

        const { error: updateError } = await supabase
            .from('review')
            .update({
                comments: post.comments - 1 - (count || 0), // 댓글 수에서 삭제된 댓글과 대댓글 수를 뺌
            })
            .eq('id', post.id)

        if (updateError) {
            console.error('댓글 수 업데이트 실패:', updateError)
        }

        fetchData()
    }

    const handleLike = async () => {
        if (!currentUserId) {
            alert('로그인이 필요합니다.')
            return
        }

        if (isLiked) {
            const { error } = await supabase
                .from('likes')
                .delete()
                .eq('user_id', currentUserId)
                .eq('target_id', post.id)
                .eq('type', 'review')
            if (error) {
                console.error('좋아요 취소 실패:', error)
                return
            }
        } else {
            const { error } = await supabase.from('likes').insert({
                user_id: currentUserId,
                target_id: post.id,
                type: 'review',
            })
            if (error) {
                console.error('좋아요 추가 실패:', error)
                return
            }
        }

        const newLiked = !isLiked

        const updatedLikes = post.likes + (newLiked ? 1 : -1)

        const { error: updateerror } = await supabase.from('review').update({ likes: updatedLikes }).eq('id', post.id)

        if (updateerror) {
            console.error('좋아요 업데이트 실패:', updateerror)
            // 실패 시 UI 롤백도 가능
            setIsLiked(!newLiked)
        } else {
            setPost({ ...post, likes: updatedLikes }) // UI에 반영
            setIsLiked(newLiked)
        }
        fetchLikes()
    }
    type NestedComment = Comment & {
        replies?: NestedComment[]
    }

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
                        {post.file_url && post.file_type === 'image' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <img
                                    src={post.file_url}
                                    alt={`Post image`}
                                    className="w-full h-48 object-cover object-top rounded-lg"
                                />
                            </div>
                        )}
                        {post.file_url && post.file_type === 'video' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <video
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-48 object-cover object-top rounded-lg"
                                >
                                    <source src={post.file_url} type="video/mp4" />
                                    <source src={post.file_url} type="video/webm" />
                                </video>
                            </div>
                        )}
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

                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                    #{tag}
                                </span>
                            ))}
                        </div>

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

                                {/* <button
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
                                </button> */}
                            </div>

                            <div className="flex items-center gap-4">
                                {/* <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
                                    <div className="w-4 h-4 flex items-center justify-center">
                                        <i className="ri-share-line text-sm"></i>
                                    </div>
                                    공유
                                </button> */}
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
                                            onClick={() => handleSubmitComment()}
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
                                                {comment.user_id === currentUserId && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleDelete(comment.id)
                                                        }}
                                                        className="text-red-500 hover:underline text-sm"
                                                    >
                                                        삭제
                                                    </button>
                                                )}
                                                <span className="text-sm text-gray-500">{comment.created_at}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm mb-2">{comment.body}</p>
                                            <div className="flex items-center gap-4">
                                                {/* <button
                                                    onClick={() => handleLike('comment')}
                                                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 cursor-pointer"
                                                >
                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                        <i className="ri-thumb-up-line text-xs"></i>
                                                    </div>
                                                    {comment.likes}
                                                </button> */}
                                                <button
                                                    className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer"
                                                    onClick={() => setReplyToCommentId(comment.id)}
                                                >
                                                    답글
                                                </button>
                                            </div>
                                            {replyToCommentId === comment.id && (
                                                <div className="mt-2">
                                                    <textarea
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                        placeholder="답글을 입력하세요..."
                                                        className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                                                        rows={2}
                                                    />
                                                    <div className="flex justify-end mt-1 gap-2">
                                                        <button
                                                            onClick={() => handleSubmitComment(comment.id)}
                                                            disabled={!replyContent.trim()}
                                                            className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm disabled:bg-gray-300"
                                                        >
                                                            작성
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setReplyToCommentId(null)
                                                                setReplyContent('')
                                                            }}
                                                            className="text-sm text-gray-400 hover:underline"
                                                        >
                                                            취소
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {comment.replies && (
                                                <div className="mt-4 space-y-3">
                                                    {comment.replies.map((reply) => (
                                                        <div
                                                            key={reply.id}
                                                            className="flex items-start gap-3 pl-4 border-l border-gray-200"
                                                        >
                                                            <img
                                                                src={reply.user?.profile_image}
                                                                alt={reply.user?.username}
                                                                className="w-8 h-8 rounded-full object-cover object-top"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="font-medium text-gray-900 text-sm">
                                                                        {reply.user?.username}
                                                                    </span>
                                                                    {reply.user_id === currentUserId && (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                handleDelete(reply.id)
                                                                            }}
                                                                            className="text-red-500 hover:underline text-sm"
                                                                        >
                                                                            삭제
                                                                        </button>
                                                                    )}
                                                                    <span className="text-xs text-gray-500">
                                                                        {reply.created_at}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-700 text-sm mb-1">
                                                                    {reply.body}
                                                                </p>
                                                                {/* <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                                        <i className="ri-thumb-up-line text-xs"></i>
                                                                    </div>
                                                                    {reply.likes}
                                                                </button> */}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
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
