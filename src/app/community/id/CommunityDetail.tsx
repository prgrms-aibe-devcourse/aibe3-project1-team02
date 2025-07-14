'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface CommunityDetailProps {
    postId: string
}

export default function CommunityDetail({ postId }: CommunityDetailProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [newComment, setNewComment] = useState('')

    const posts = {
        '1': {
            id: 1,
            type: 'review',
            title: '제주도 3박 4일 완벽 가이드 (사진 많음)',
            content: `제주도 여행 다녀왔는데 정말 좋았어요! Özellikle 성산일출봉에서 본 일출이 정말 감동적이었습니다. 
      
レン터카 빌려서 돌아다니니까 자유롭게 구경할 수 있어서 좋았고, 현지 분들도 친절하시더라구요.
      
**Day 1: 제주공항 → 성산일출봉 → 우도**
- 성산일출봉은 아침 일찍 가는 걸 추천해요. 일출 시간에 맞춰서 가면 정말 장관입니다.
- 우도는 배 타고 들어가는데, 자전거 빌려서 한 바퀴 도는 게 제일 좋아요.
      
**Day 2: 한라산 → 중문 → 천지연 폭포**
- 한라산은 체력이 좀 필요해요. 편한 신발 꼭 챙기세요!
- 중문 해수욕장은 파도가 좀 센 편이니까 주의하세요.
      
**Day 3: 애월 → 한림공원 → 협재해수욕장**
- 애월 카페거리는 인스타 감성 제대로에요. 사진 찍기 좋아요.
- 협재해수욕장 물이 realmente 깨끗하고 예뻐요.
      
**맛집 추천:**
- 고기국수: 제주 현지인들이 정말 많이 가는 곳
- 흑돼지 구이: 한상차림으로 나오는데 진짜 맛있어요
- 갈치조림: 제주 특산품이니까 꼭 드셔보세요
      
전체적으로 정말 만족스러운 여행이었어요. 다음에는 더 오래 머물고 싶네요!`,
            author: '여행러버',
            avatar: 'https://readdy.ai/api/search-image?query=Friendly%20Korean%20traveler%20profile%20photo%2C%20young%20person%20with%20warm%20smile%2C%20casual%20travel%20outfit%2C%20bright%20and%20positive%20atmosphere&width=60&height=60&seq=avatar-detail-1&orientation=squarish',
            location: '제주도',
            date: '2024-01-15',
            views: 1247,
            likes: 89,
            comments: 23,
            tags: ['제주도', '후기', '렌터카'],
            images: [
                'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20Seongsan%20Ilchulbong%20sunrise%20with%20orange%20sky%2C%20peaceful%20ocean%20view%2C%20iconic%20volcanic%20crater%20formation%20with%20dramatic%20morning%20light&width=600&height=400&seq=jeju-post-1&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Jeju%20Island%20Udo%20island%20with%20turquoise%20waters%2C%20bicycle%20rental%2C%20white%20sandy%20beaches%2C%20and%20traditional%20Korean%20fishing%20boats%2C%20pristine%20island%20paradise&width=600&height=400&seq=jeju-post-2&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Jeju%20Island%20Hallasan%20mountain%20hiking%20trail%20with%20lush%20green%20forest%2C%20volcanic%20rocks%2C%20and%20beautiful%20mountain%20scenery%2C%20peaceful%20nature%20atmosphere&width=600&height=400&seq=jeju-post-3&orientation=landscape',
            ],
        },
        '2': {
            id: 2,
            type: 'question',
            title: '일본 여행 JR패스 꼭 사야하나요?',
            content: `안녕하세요! 다음 달에 일본 여행을 계획하고 있는데요.
      
**여행 일정:**
- 도쿄 3일 (신주쿠, 시부야, 아사쿠사 등)
- 오사카 2일 (도톤보리, 오사카성 등)  
- 교토 2일 (기요미즈데라, 후시미이나리 등)
      
총 7일 일정으로 도쿄 → 오사카 → 교토 → 도쿄 이렇게 움직일 예정입니다.
      
JR패스가 꽤 비싸던데, 정말 필요한지 궁금해요. 
개별 티켓으로 사는 게 더 경제적일까요?
      
그리고 JR패스 말고 다른 교통카드 추천해주실 분 있나요?
      
경험 있으신 분들 조언 부탁드려요! 🙏`,
            author: '초보여행자',
            avatar: 'https://readdy.ai/api/search-image?query=Curious%20young%20Korean%20person%20asking%20questions%2C%20friendly%20and%20approachable%20appearance%2C%20casual%20style%20with%20questioning%20expression&width=60&height=60&seq=avatar-detail-2&orientation=squarish',
            location: '일본',
            date: '2024-01-14',
            views: 892,
            likes: 34,
            comments: 45,
            tags: ['일본', '교통', 'JR패스'],
            images: [],
        },
    }

    const post = posts[postId as keyof typeof posts] || posts['1']

    const comments = [
        {
            id: 1,
            author: '일본여행고수',
            avatar: 'https://readdy.ai/api/search-image?query=Experienced%20Japanese%20traveler%20with%20friendly%20smile%2C%20casual%20travel%20outfit%2C%20knowledgeable%20and%20helpful%20appearance&width=50&height=50&seq=comment-avatar-1&orientation=squarish',
            date: '2024-01-15',
            content:
                post.type === 'review'
                    ? '정보 정말 유용해요! 저도 다음 달에 제주도 가는데 참고할게요. 혹시 렌터카 어디서 빌리셨나요?'
                    : '7일 일정이면 JR패스 사는 게 맞아요! 도쿄-오사카만 왕복해도 거의 본전이고, 교토까지 가면 확실히 이득입니다. 개별 티켓은 더 비싸요.',
            likes: 12,
            replies: [
                {
                    id: 11,
                    author: post.author,
                    avatar: post.avatar,
                    date: '2024-01-15',
                    content:
                        post.type === 'review'
                            ? '롯데렌터카에서 빌렸어요! 가격도 괜찮고 차량 상태도 좋았습니다 👍'
                            : '정말 그런가요? 그럼 JR패스로 결정해야겠네요. 감사합니다!',
                    likes: 3,
                },
            ],
        },
        {
            id: 2,
            author: '여행매니아',
            avatar: 'https://readdy.ai/api/search-image?query=Travel%20enthusiast%20with%20bright%20smile%2C%20backpack%20and%20travel%20gear%2C%20adventurous%20and%20energetic%20personality&width=50&height=50&seq=comment-avatar-2&orientation=squarish',
            date: '2024-01-14',
            content:
                post.type === 'review'
                    ? '사진도 너무 예쁘게 찍으셨네요! 특히 성산일출봉 사진이 정말 멋져요. 카메라는 뭐 쓰셨나요?'
                    : 'IC카드(Suica, Pasmo)도 추천해요! 지하철이나 버스 탈 때 편리하고, 편의점에서도 결제 가능합니다.',
            likes: 8,
            replies: [],
        },
        {
            id: 3,
            author: post.type === 'review' ? '제주도토박이' : '도쿄거주자',
            avatar: 'https://readdy.ai/api/search-image?query=Local%20resident%20with%20warm%20and%20welcoming%20expression%2C%20casual%20outfit%2C%20helpful%20and%20knowledgeable%20appearance&width=50&height=50&seq=comment-avatar-3&orientation=squarish',
            date: '2024-01-14',
            content:
                post.type === 'review'
                    ? '제주 현지인으로서 gerçekten 잘 다녀가신 것 같아요! 다음에 오시면 더 숨겨진 맛집들도 알려드릴게요 ㅎㅎ'
                    : '도쿄 살고 있는데, 관광지 많이 다니실 거면 JR패스가 확실히 경제적이에요. 특히 야마노테선 자주 타게 될 텐데 JR패스면 무제한이거든요.',
            likes: 15,
            replies: [],
        },
    ]

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

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            setNewComment('')
        }
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
                                src={post.avatar}
                                alt={post.author}
                                className="w-12 h-12 rounded-full object-cover object-top"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-medium text-gray-900">{post.author}</span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}
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
                        )}

                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                        isLiked
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                        <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'} text-sm`}></i>
                                    </div>
                                    좋아요 {post.likes + (isLiked ? 1 : 0)}
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
                                            className={`${isBookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'} text-sm`}
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
                                    src="https://readdy.ai/api/search-image?query=Friendly%20user%20profile%20photo%20with%20warm%20smile%2C%20casual%20style%2C%20approachable%20personality&width=40&height=40&seq=current-user&orientation=squarish"
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
                                            src={comment.avatar}
                                            alt={comment.author}
                                            className="w-10 h-10 rounded-full object-cover object-top"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900">{comment.author}</span>
                                                <span className="text-sm text-gray-500">{comment.date}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                        <i className="ri-thumb-up-line text-xs"></i>
                                                    </div>
                                                    {comment.likes}
                                                </button>
                                                <button className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                                                    답글
                                                </button>
                                            </div>

                                            {comment.replies && comment.replies.length > 0 && (
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
