
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';


export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: '전체', icon: 'ri-earth-line' },
    { id: 'domestic', name: '국내', icon: 'ri-map-2-line' },
    { id: 'asia', name: '아시아', icon: 'ri-compass-3-line' },
    { id: 'europe', name: '유럽', icon: 'ri-ancient-gate-line' },
    { id: 'america', name: '아메리카', icon: 'ri-building-line' },
    { id: 'oceania', name: '오세아니아', icon: 'ri-sun-line' }
  ];

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.rpc('get_destination_overview');
      setDestinations(data);
    }
    fetchData();
  }, []);
  console.log(destinations);

  const filteredDestinations = destinations.filter((dest: any) => {
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
          {filteredDestinations.map((destination: any) => (
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
                    {destination.tags.map((tag: any, index: any) => (
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
