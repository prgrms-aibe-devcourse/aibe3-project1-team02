'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface DestinationDetailProps {
    destinationId: string
}


export default function DestinationDetail({ destinationId }: DestinationDetailProps) {
    const [activeTab, setActiveTab] = useState('overview')
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [destination, setDestination] = useState<any>(null)
    const [reviews, setReviews] = useState<any[]>([])
    const [packages, setPackages] = useState<any[]>([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const selected = searchParams.get('selected')

    const [helpfulCounts, setHelpfulCounts] = useState<{ [id: number]: number }>({})
    const [helpfulClicked, setHelpfulClicked] = useState<{ [id: number]: boolean }>({})

    console.log(parseInt(destinationId))
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.rpc('get_destination_detail', { dest_id: parseInt(destinationId) })
            if (error) {
                console.error(error)
                return
            }
            setDestination(data?.[0] ?? null)
        }
        fetchData()
         }, [destinationId])

    useEffect(() => {
      async function fetchData() {
        const { data, error } = await supabase.rpc('get_destination_reviews', { dest_id: parseInt(destinationId) })
        setReviews(data || [])
      }
      fetchData()
    }, [destinationId])

    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase.rpc('get_destination_packages', { dest_id: parseInt(destinationId) })
          setPackages(data)
        }
        fetchData()
      }, [])


    if (!destination) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex justify-center items-center h-screen"></div>
                <Footer />
            </div>
        )
    }

    const tabs = [
        { id: 'overview', name: '개요', icon: 'ri-information-line' },
        { id: 'attractions', name: '관광명소', icon: 'ri-map-pin-line' },
        { id: 'reviews', name: '후기', icon: 'ri-star-line' },
        { id: 'packages', name: '패키지', icon: 'ri-gift-line' },
    ]




    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="relative h-96 overflow-hidden">
                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover object-top" />
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
                    {destination.highlight.map((highlight: any, index: any) => (
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
                    {destination.tags.map((tag: any, index: any) => (
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
                                {destination.highlight.map((highlight: any, index: any) => (
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
                                    onClick={() =>
                                        router.push(`/planner?destination=${encodeURIComponent(destination.name)}`)
                                    }
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium mt-6"
                                >
                                    여행 계획 세우기
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'packages' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {packages.map((pkg: any) => (
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
                                            <span className="text-2xl font-bold text-blue-600">{pkg.price.toLocaleString()}원</span>
                                            <span className="text-lg text-gray-400 line-through">
                                                {pkg.originalPrice}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h4 className="font-medium text-gray-900 mb-2">포함 사항</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {pkg.includes.map((item: any, index: any) => (
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
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                                onClick={() => router.push('/community')}
                            >
                                후기 작성
                            </button>
                        </div>

                        {reviews.map((review: any) => {
                            const helpful = helpfulCounts[review.id] ?? review.helpful
                            const clicked = helpfulClicked[review.id] ?? false
                            return (
                                <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900">{review.author}</span>
                                                  {/* <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-4 h-4 flex items-center justify-center"
                                                        >
                                                            <i
                                                                className={`ri-star-fill text-sm ${
                                                                    i < review.rating
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300'
                                                                }`}
                                                            ></i>
                                                        </div>
                                                    ))}
                                                </div> */}
                                            </div>
                                            <p className="text-sm text-gray-500">{review.date}</p>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                                    <p className="text-gray-700 mb-4">{review.content}</p>
                                    {/* {review.images.length > 0 && (
                                        <div className="flex gap-2 mb-4">
                                            {review.images.map((image: any, index: any) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt="Review"
                                                    className="w-20 h-20 object-cover object-top rounded-lg"
                                                />
                                            ))}
                                        </div>
                                    )} */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <button
                                            className={`flex items-center gap-1 cursor-pointer ${
                                                clicked ? 'text-blue-600 font-bold' : 'hover:text-blue-600'
                                            }`}
                                            onClick={() => {
                                                setHelpfulCounts((prev) => ({
                                                    ...prev,
                                                    [review.id]: clicked
                                                        ? (prev[review.id] ?? review.helpful) - 1
                                                        : (prev[review.id] ?? review.helpful) + 1,
                                                }))
                                                setHelpfulClicked((prev) => ({
                                                    ...prev,
                                                    [review.id]: !clicked,
                                                }))
                                            }}
                                        >
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                <i className="ri-thumb-up-line text-xs"></i>
                                            </div>
                                            도움됨 {helpful}
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                <i className="ri-chat-3-line text-xs"></i>
                                            </div>
                                            댓글
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {activeTab === 'attractions' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {destination.highlight.slice(0, 4).map((attraction: any, index: any) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                            >
                                <div className="relative h-64">
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
