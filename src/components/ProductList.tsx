
'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  duration: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: '제주도 3박 4일 힐링 패키지',
    description: '제주의 아름다운 자연과 함께하는 완벽한 휴식',
    price: 450000,
    location: '제주도',
    duration: '3박 4일',
    rating: 4.8,
    reviewCount: 324,
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20landscape%20with%20mountains%20and%20ocean%2C%20peaceful%20vacation%20destination%20with%20blue%20sky%20and%20green%20nature%2C%20tourism%20photography%20style&width=400&height=300&seq=jeju1&orientation=landscape',
    category: '국내여행'
  },
  {
    id: '2',
    title: '부산 바다 여행 2박 3일',
    description: '해운대와 광안리에서 즐기는 바다 여행',
    price: 280000,
    location: '부산',
    duration: '2박 3일',
    rating: 4.6,
    reviewCount: 198,
    image: 'https://readdy.ai/api/search-image?query=Busan%20beach%20cityscape%20with%20modern%20buildings%20and%20ocean%20view%2C%20beautiful%20coastal%20city%20in%20Korea%2C%20travel%20destination%20with%20blue%20water%20and%20urban%20skyline&width=400&height=300&seq=busan1&orientation=landscape',
    category: '국내여행'
  },
  {
    id: '3',
    title: '경주 역사 문화 탐방',
    description: '천년 고도 경주의 역사와 문화를 체험',
    price: 320000,
    location: '경주',
    duration: '2박 3일',
    rating: 4.7,
    reviewCount: 156,
    image: 'https://readdy.ai/api/search-image?query=Gyeongju%20historical%20temples%20and%20traditional%20Korean%20architecture%2C%20ancient%20cultural%20heritage%20site%20with%20beautiful%20gardens%20and%20stone%20structures&width=400&height=300&seq=gyeongju1&orientation=landscape',
    category: '문화체험'
  },
  {
    id: '4',
    title: '서울 도심 투어',
    description: '현대와 전통이 공존하는 서울의 매력 발견',
    price: 180000,
    location: '서울',
    duration: '1박 2일',
    rating: 4.5,
    reviewCount: 243,
    image: 'https://readdy.ai/api/search-image?query=Seoul%20city%20skyline%20with%20traditional%20palaces%20and%20modern%20buildings%2C%20vibrant%20Korean%20capital%20city%20with%20cultural%20landmarks%20and%20urban%20landscape&width=400&height=300&seq=seoul1&orientation=landscape',
    category: '도시여행'
  }
];

export default function ProductList() {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortBy, setSortBy] = useState<string>('인기순');

  const categories = ['전체', '국내여행', '문화체험', '도시여행'];
  const sortOptions = ['인기순', '가격낮은순', '가격높은순', '평점높은순'];

  const filteredProducts = products.filter(product => 
    selectedCategory === '전체' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case '가격낮은순':
        return a.price - b.price;
      case '가격높은순':
        return b.price - a.price;
      case '평점높은순':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">여행 상품</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer pr-8"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-500">
                  <span className="mr-3">{product.location}</span>
                  <span>{product.duration}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-blue-600">
                  {product.price.toLocaleString()}원
                </div>
                <Link href={`/products/${product.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    상세보기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
