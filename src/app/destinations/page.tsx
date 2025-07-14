
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: '전체', icon: 'ri-earth-line' },
    { id: 'domestic', name: '국내', icon: 'ri-map-2-line' },
    { id: 'asia', name: '아시아', icon: 'ri-compass-3-line' },
    { id: 'europe', name: '유럽', icon: 'ri-ancient-gate-line' },
    { id: 'america', name: '아메리카', icon: 'ri-building-line' },
    { id: 'oceania', name: '오세아니아', icon: 'ri-sun-line' }
  ];

  const destinations = [
    {
      id: 1,
      name: '제주도',
      country: '대한민국',
      category: 'domestic',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20landscape%20with%20Hallasan%20mountain%2C%20emerald%20ocean%2C%20and%20traditional%20Korean%20stone%20walls%2C%20peaceful%20island%20atmosphere%20with%20clear%20blue%20sky%20and%20lush%20green%20nature&width=400&height=300&seq=jeju-dest-1&orientation=landscape',
      rating: 4.8,
      reviews: 2847,
      price: '120,000원부터',
      tags: ['자연', '힐링', '해변']
    },
    {
      id: 2,
      name: '부산',
      country: '대한민국',
      category: 'domestic',
      image: 'https://readdy.ai/api/search-image?query=Busan%20cityscape%20with%20colorful%20Gamcheon%20village%20houses%2C%20beautiful%20beaches%2C%20and%20modern%20skyscrapers%2C%20vibrant%20Korean%20coastal%20city%20with%20mountain%20backdrop&width=400&height=300&seq=busan-dest-2&orientation=landscape',
      rating: 4.7,
      reviews: 1923,
      price: '95,000원부터',
      tags: ['도시', '해변', '문화']
    },
    {
      id: 3,
      name: '도쿄',
      country: '일본',
      category: 'asia',
      image: 'https://readdy.ai/api/search-image?query=Tokyo%20cityscape%20with%20cherry%20blossoms%2C%20traditional%20temples%2C%20modern%20skyscrapers%2C%20and%20bustling%20streets%2C%20vibrant%20Japanese%20metropolitan%20atmosphere%20with%20cultural%20blend&width=400&height=300&seq=tokyo-dest-3&orientation=landscape',
      rating: 4.9,
      reviews: 3542,
      price: '380,000원부터',
      tags: ['도시', '쇼핑', '문화']
    },
    {
      id: 4,
      name: '파리',
      country: '프랑스',
      category: 'europe',
      image: 'https://readdy.ai/api/search-image?query=Paris%20cityscape%20with%20Eiffel%20Tower%2C%20Seine%20river%2C%20classic%20Haussmanian%20architecture%2C%20and%20charming%20cobblestone%20streets%2C%20romantic%20European%20atmosphere%20with%20warm%20golden%20lighting&width=400&height=300&seq=paris-dest-4&orientation=landscape',
      rating: 4.8,
      reviews: 4126,
      price: '650,000원부터',
      tags: ['로맨틱', '예술', '역사']
    },
    {
      id: 5,
      name: '뉴욕',
      country: '미국',
      category: 'america',
      image: 'https://readdy.ai/api/search-image?query=New%20York%20City%20skyline%20with%20iconic%20skyscrapers%2C%20Central%20Park%2C%20Brooklyn%20Bridge%2C%20and%20busy%20Manhattan%20streets%2C%20dynamic%20American%20metropolitan%20atmosphere&width=400&height=300&seq=newyork-dest-5&orientation=landscape',
      rating: 4.7,
      reviews: 2864,
      price: '720,000원부터',
      tags: ['도시', '쇼핑', '엔터테인먼트']
    },
    {
      id: 6,
      name: '시드니',
      country: '호주',
      category: 'oceania',
      image: 'https://readdy.ai/api/search-image?query=Sydney%20harbor%20with%20Opera%20House%2C%20Harbor%20Bridge%2C%20beautiful%20beaches%2C%20and%20modern%20cityscape%2C%20stunning%20Australian%20coastal%20city%20with%20crystal%20clear%20waters&width=400&height=300&seq=sydney-dest-6&orientation=landscape',
      rating: 4.9,
      reviews: 1765,
      price: '580,000원부터',
      tags: ['해변', '자연', '도시']
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">여행지 둘러보기</h1>
          <p className="text-xl text-blue-100">전 세계 아름다운 여행지를 발견해보세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
                <input
                  type="text"
                  placeholder="여행지나 국가명을 검색해보세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${category.icon} text-sm`}></i>
                </div>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <Link key={destination.id} href={`/destinations/${destination.id}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                    {destination.category === 'domestic' ? '국내' : '해외'}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                      <p className="text-gray-600 text-sm">{destination.country}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{destination.price}</p>
                      <p className="text-xs text-gray-500">{destination.reviews.toLocaleString()}개 후기</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm">
                      자세히 보기
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
