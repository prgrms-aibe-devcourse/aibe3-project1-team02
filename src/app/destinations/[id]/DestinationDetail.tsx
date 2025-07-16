'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

interface DestinationDetailProps {
    destinationId: string
}

export default function DestinationDetail({ destinationId }: DestinationDetailProps) {
    const [activeTab, setActiveTab] = useState('overview')
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const destinations = {
        '1': {
            name: '제주도',
            country: '대한민국',
            category: 'domestic',
            rating: 4.8,
            reviews: 2847,
            price: '120,000원부터',
            tags: ['자연', '힐링', '해변'],
            description:
                '한국의 대표적인 휴양지 제주도는 아름다운 자연경관과 독특한 문화로 유명합니다. 한라산, 성산일출봉, 우도 등 다양한 관광명소와 맛있는 향토음식을 즐길 수 있습니다.',
            images: [
                'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20landscape%20with%20Hallasan%20mountain%2C%20emerald%20ocean%2C%20and%20traditional%20Korean%20stone%20walls%2C%20peaceful%20island%20atmosphere%20with%20clear%20blue%20sky%20and%20lush%20green%20nature&width=800&height=500&seq=jeju-detail-1&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Seongsan%20Ilchulbong%20sunrise%20peak%20in%20Jeju%20Island%2C%20dramatic%20volcanic%20crater%20with%20ocean%20view%2C%20golden%20sunrise%20lighting%20over%20peaceful%20waters&width=800&height=500&seq=jeju-detail-2&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Jeju%20Island%20Udo%20island%20with%20turquoise%20waters%2C%20white%20sandy%20beaches%2C%20and%20traditional%20Korean%20fishing%20boats%2C%20pristine%20island%20paradise%20atmosphere&width=800&height=500&seq=jeju-detail-3&orientation=landscape',
            ],
            highlights: [
                {
                    title: '한라산 국립공원',
                    description: '한국 최고봉과 아름다운 등산로',
                    image: 'https://cdn.jejusori.net/news/photo/201911/309130_311612_210.jpg',
                },
                {
                    title: '성산일출봉',
                    description: '세계자연유산 지정 일출 명소',
                    image: 'https://api.cdn.visitjeju.net/photomng/imgpath/202409/20/c8df320a-80df-47d9-a541-bf86631e5d51.png',
                },
                {
                    title: '우도',
                    description: '에메랄드빛 바다의 작은 섬',
                    image: 'https://www.jejunews.com/news/photo/201808/2120401_156386_519.jpg',
                },
                {
                    title: '제주 올레길',
                    description: '아름다운 해안선을 따라 걷는 길',
                    image: 'https://dimg.donga.com/wps/NEWS/IMAGE/2019/12/26/98977901.1.jpg',
                },
            ],
            bestTime: '3월-5월, 9월-11월',
            duration: '2박 3일 ~ 4박 5일',
            transportation: '항공편 (김포/인천 → 제주)',
            climate: '온대 해양성 기후, 연중 온화',
        },
        '2': {
            name: '부산',
            country: '대한민국',
            category: 'domestic',
            rating: 4.7,
            reviews: 1923,
            price: '95,000원부터',
            tags: ['도시', '해변', '문화'],
            description:
                '한국의 대표적인 항구도시 부산은 아름다운 해변과 다양한 문화, 맛있는 음식으로 유명합니다. 해운대, 감천문화마을, 자갈치시장 등을 즐길 수 있습니다.',
            images: [
                'https://readdy.ai/api/search-image?query=Busan%20cityscape%20with%20colorful%20Gamcheon%20village%20houses%2C%20beautiful%20beaches%2C%20and%20modern%20skyscrapers%2C%20vibrant%20Korean%20coastal%20city%20with%20mountain%20backdrop&width=800&height=500&seq=busan-detail-1&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Haeundae%20Beach%20in%20Busan%20with%20clear%20blue%20waters%2C%20white%20sand%2C%20and%20modern%20city%20skyline%2C%20popular%20Korean%20beach%20destination%20with%20parasols%20and%20visitors&width=800&height=500&seq=busan-detail-2&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Jagalchi%20Fish%20Market%20in%20Busan%20with%20fresh%20seafood%2C%20traditional%20Korean%20market%20atmosphere%2C%20bustling%20vendors%20and%20colorful%20marine%20products&width=800&height=500&seq=busan-detail-3&orientation=landscape',
            ],
            highlights: [
                {
                    title: '해운대 해수욕장',
                    description: '한국 최고의 해변 리조트',
                    image: 'https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153531987_oen',
                },
                {
                    title: '김천문화마을',
                    description: '알록달록한 산복도로 마을',
                    image: 'https://www.saha.go.kr/tour/images/sub/img_01_01_01.jpg',
                },
                {
                    title: '자갈치시장',
                    description: '신선한 해산물의 천국',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/1200px-Jagalchi_Market_20200523_019.jpg',
                },
                {
                    title: '광안대교',
                    description: '부산의 상징적인 야경 명소',
                    image: 'https://tourimage.interpark.com//Spot/208/17475/201204/6347034434029230232.jpg',
                },
            ],
            bestTime: '4월-6월, 9월-11월',
            duration: '1박 2일 ~ 3박 4일',
            transportation: 'KTX, 항공편, 고속버스',
            climate: '온대 해양성 기후, 겨울 온화',
        },
        '3': {
            name: '도쿄',
            country: '일본',
            category: 'asia',
            rating: 4.9,
            reviews: 3542,
            price: '380,000원부터',
            tags: ['도시', '쇼핑', '문화'],
            description:
                '일본의 수도 도쿄는 전통과 현대가 조화롭게 어우러진 매력적인 도시입니다. 아사쿠사, 시부야, 하라주쿠 등 다양한 지역의 독특한 문화를 경험할 수 있습니다.',
            images: [
                'https://readdy.ai/api/search-image?query=Tokyo%20cityscape%20with%20cherry%20blossoms%2C%20traditional%20temples%2C%20modern%20skyscrapers%2C%20and%20bustling%20streets%2C%20vibrant%20Japanese%20metropolitan%20atmosphere%20with%20cultural%20blend&width=800&height=500&seq=tokyo-detail-1&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Shibuya%20crossing%20in%20Tokyo%20with%20neon%20lights%2C%20busy%20pedestrians%2C%20and%20modern%20architecture%2C%20iconic%20Japanese%20urban%20scene%20with%20vibrant%20city%20energy&width=800&height=500&seq=tokyo-detail-2&orientation=landscape',
                'https://readdy.ai/api/search-image?query=Traditional%20Senso-ji%20temple%20in%20Asakusa%20Tokyo%20with%20cherry%20blossoms%2C%20red%20pagoda%2C%20and%20traditional%20Japanese%20architecture%20in%20peaceful%20garden%20setting&width=800&height=500&seq=tokyo-detail-3&orientation=landscape',
            ],
            highlights: [
                {
                    title: '센소지 절',
                    description: '도쿄 최고의 전통 사찰',
                    image: 'https://article.bespes-jt.com/hs-fs/hubfs/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%83%86%3F%E3%82%B5%3F%E3%82%A4%E3%83%B3%20(7)-2.png?width=864&height=486&name=%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%83%86%3F%E3%82%B5%3F%E3%82%A4%E3%83%B3%20(7)-2.png',
                },
                {
                    title: '시부야 교차로',
                    description: '세계에서 가장  바쁜 교차로',
                    image: 'https://resources.matcha-jp.com/resize/720x2000/2023/06/12-139337.webp',
                },
                {
                    title: '도쿄 스카이트리',
                    description: '도쿄의 랜드마크 전망대',
                    image: 'https://s3-ap-northeast-1.amazonaws.com/thegate/2020/12/02/19/54/49/Tokyo%20skytree.jpg',
                },
                {
                    title: '츠키지 시장',
                    description: '신선한 참치와 스시의 본고장',
                    image: 'https://img.activityjapan.com/wi/tsukiji-route_thumb.jpg',
                },
            ],
            bestTime: '3월-5월, 9월-11월',
            duration: '3박 4일 ~ 7박 8일',
            transportation: '항공편 (인천 → 나리타/하네다)',
            climate: '온대 습윤 기후, 사계절 뚜렷',
        },

        //4번부터 여행지 세부 정보
    }

    const destination = destinations[destinationId as keyof typeof destinations] || destinations['1']

    const tabs = [
        { id: 'overview', name: '개요', icon: 'ri-information-line' },
        { id: 'attractions', name: '관광명소', icon: 'ri-map-pin-line' },
        { id: 'reviews', name: '후기', icon: 'ri-star-line' },
        { id: 'packages', name: '패키지', icon: 'ri-gift-line' },
    ]

    const packages = [
        {
            id: 1,
            title: `${destination.name} 자유여행 3박 4일`,
            price: destination.price,
            originalPrice: parseInt(destination.price.replace(/[^0-9]/g, '')) + 50000 + '원',
            discount: '15%',
            rating: 4.8,
            reviews: 234,
            includes: ['왕복항공료', '숙박 3박', '조식 포함', '현지 가이드'],
            image: destination.images[0],
        },
        {
            id: 2,
            title: `${destination.name} 프리미엄 패키지`,
            price: parseInt(destination.price.replace(/[^0-9]/g, '')) + 180000 + '원부터',
            originalPrice: parseInt(destination.price.replace(/[^0-9]/g, '')) + 250000 + '원',
            discount: '20%',
            rating: 4.9,
            reviews: 156,
            includes: ['왕복항공료', '특급호텔 4박', '전 일정 식사', '전용 가이드', '입장료'],
            image: destination.images[1],
        },
    ]

    const reviews = [
        {
            id: 1,
            author: '여행매니아김씨',
            rating: 5,
            date: '2024-01-10',
            title: '정말 완벽한 여행이었어요!',
            content: `${destination.name} 여행이 정말 좋았습니다. 특히 현지 가이드분이 친절하시고 숨겨진 맛집들도 많이 알려주셔서 더욱 즐거웠어요. 다음에도 꼭 다시 가고 싶습니다.`,
            helpful: 23,
            images: [destination.images[0]],
        },
        {
            id: 2,
            author: '행복한여행자',
            rating: 4,
            date: '2024-01-08',
            title: '가족여행으로 추천합니다',
            content: `아이들과 함께 갔는데 정말 좋았어요. 안전하고 깨끗하며 볼거리도 많았습니다. 다만 성수기라 사람이 많아서 조금 아쉬웠지만 전반적으로 만족스러운 여행이었습니다.`,
            helpful: 18,
            images: [],
        },
    ]

    const router = useRouter()
    const searchParams = useSearchParams()
    const selected = searchParams.get('selected')

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="relative h-96 overflow-hidden">
                <img
                    src={destination.images[selectedImageIndex]}
                    alt={destination.name}
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
                        <div className="text-white">
                            <nav className="flex items-center gap-2 text-sm mb-4">
                                <Link href="/destinations" className="hover:underline">
                                    여행지
                                </Link>
                                <i className="ri-arrow-right-s-line"></i>
                                <span>{destination.name}</span>
                            </nav>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
                            <p className="text-xl text-white/90">{destination.country}</p>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-1">
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        <i className="ri-star-fill text-yellow-400"></i>
                                    </div>
                                    <span className="font-medium">{destination.rating}</span>
                                    <span className="text-white/70">({destination.reviews}개 후기)</span>
                                </div>
                                <div className="text-2xl font-bold">{destination.price}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute right-4 top-4 flex gap-2">
                    {destination.images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                                selectedImageIndex === index ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-2 mb-8">
                    {destination.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <div className="w-4 h-4 flex items-center justify-center">
                                <i className={`${tab.icon} text-sm`}></i>
                            </div>
                            {tab.name}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">여행지 소개</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">{destination.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {destination.highlights.map((highlight, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                                        <p className="text-gray-600 text-sm">{highlight.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">여행 정보</h3>
                                <div className="space-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600 mb-1">최적 여행시기</dt>
                                        <dd className="text-gray-900">{destination.bestTime}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600 mb-1">권장 여행기간</dt>
                                        <dd className="text-gray-900">{destination.duration}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600 mb-1">교통편</dt>
                                        <dd className="text-gray-900">{destination.transportation}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600 mb-1">기후</dt>
                                        <dd className="text-gray-900">{destination.climate}</dd>
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium mt-6"
                                    onClick={() => router.push(`/planner?selected=${destination.name}`)}
                                >
                                    여행 계획 세우기
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'packages' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                                        {pkg.discount} 할인
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                <i className="ri-star-fill text-yellow-400 text-sm"></i>
                                            </div>
                                            <span className="text-sm font-medium">{pkg.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">({pkg.reviews}개 후기)</span>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                                            <span className="text-lg text-gray-400 line-through">
                                                {pkg.originalPrice}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h4 className="font-medium text-gray-900 mb-2">포함 사항</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {pkg.includes.map((item, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <div className="w-3 h-3 flex items-center justify-center">
                                                        <i className="ri-check-line text-green-500 text-xs"></i>
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium">
                                        예약하기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">여행 후기</h2>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                                후기 작성
                            </button>
                        </div>

                        {reviews.map((review) => (
                            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900">{review.author}</span>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="w-4 h-4 flex items-center justify-center">
                                                        <i
                                                            className={`ri-star-fill text-sm ${
                                                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                            }`}
                                                        ></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                                <p className="text-gray-700 mb-4">{review.content}</p>
                                {review.images.length > 0 && (
                                    <div className="flex gap-2 mb-4">
                                        {review.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt="Review"
                                                className="w-20 h-20 object-cover object-top rounded-lg"
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <button className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                                        <div className="w-4 h-4 flex items-center justify-center">
                                            <i className="ri-thumb-up-line text-xs"></i>
                                        </div>
                                        도움됨 {review.helpful}
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                                        <div className="w-4 h-4 flex items-center justify-center">
                                            <i className="ri-chat-3-line text-xs"></i>
                                        </div>
                                        댓글
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'attractions' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {destination.highlights.slice(0, 4).map((attraction, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={
                                            (attraction as any).image ||
                                            destination.images[index % destination.images.length]
                                        }
                                        alt={attraction.title}
                                        className="w-full h-full object-cover object-[100%_35%]"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.title}</h3>
                                    <p className="text-gray-700">{attraction.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
