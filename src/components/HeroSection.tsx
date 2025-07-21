'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!searchQuery.trim()) return

        setIsLoading(true)

        const { data, error } = await supabase
            .from('destination')
            .select('id,name')
            .ilike('name', `%${searchQuery}%`)
            .limit(1)
            .maybeSingle()

        setIsLoading(false)

        if (error) {
            alert('검색 중 오류가 발생했습니다.')
            return
        }
        if (data && data.id) {
            router.push(`/destinations/${data.id}`)
        } else {
            alert('검색 결과가 없습니다.')
        }
    }

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat min-h-[600px] flex items-center"
            style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20travel%20landscape%20with%20mountains%2C%20clear%20blue%20sky%2C%20and%20serene%20lake%20reflecting%20the%20scenery%2C%20modern%20minimalist%20composition%20with%20space%20for%20text%20overlay%20on%20the%20left%20side%2C%20peaceful%20and%20inspiring%20atmosphere%20perfect%20for%20travel%20planning%20website%20hero%20section&width=1200&height=600&seq=hero-travel-1&orientation=landscape')`,
            }}
        >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                    <div className="max-w-2xl">
                        <p className="text-lg md:text-2xl text-white/70 mb-2 font-semibold tracking-wide">
                            Trip And Travel
                        </p>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            완벽한 여행을
                            <br />
                            계획해보세요
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            AI가 추천하는 맞춤형 여행지와 일정으로 특별한 추억을 만들어보세요
                        </p>

                        <form className="bg-white rounded-xl p-6 shadow-lg" onSubmit={handleSearch}>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                                        <i className="ri-search-line text-gray-400 text-sm"></i>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="여행지명을 입력하세요"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium"
                                >
                                    {isLoading ? '검색 중...' : '검색하기'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
