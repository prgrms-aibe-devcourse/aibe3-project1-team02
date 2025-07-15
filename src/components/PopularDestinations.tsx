
'use client';

export default function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: '제주도',
      description: '아름다운 자연과 독특한 문화',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20landscape%20with%20Hallasan%20mountain%2C%20traditional%20stone%20walls%2C%20and%20blue%20ocean%20view%2C%20bright%20sunny%20day%20with%20clear%20skies%2C%20tourism%20photography%20style%20showcasing%20natural%20beauty%20of%20South%20Korea&width=400&height=300&seq=jeju-1&orientation=landscape',
      rating: 4.8,
      reviews: 2847
    },
    {
      id: 2,
      name: '부산',
      description: '바다와 도시의 완벽한 조화',
      image: 'https://readdy.ai/api/search-image?query=Busan%20city%20skyline%20with%20beautiful%20beaches%2C%20colorful%20Gamcheon%20Culture%20Village%20houses%2C%20and%20modern%20buildings%2C%20vibrant%20coastal%20city%20atmosphere%20with%20ocean%20view%2C%20travel%20destination%20photography&width=400&height=300&seq=busan-1&orientation=landscape',
      rating: 4.7,
      reviews: 1923
    },
    {
      id: 3,
      name: '경주',
      description: '천년 고도의 역사와 문화',
      image: 'https://readdy.ai/api/search-image?query=Ancient%20Korean%20temple%20in%20Gyeongju%20with%20traditional%20architecture%2C%20peaceful%20garden%20surroundings%2C%20historical%20Buddhist%20temple%20with%20stone%20pagoda%2C%20serene%20atmosphere%20showcasing%20Korean%20cultural%20heritage&width=400&height=300&seq=gyeongju-1&orientation=landscape',
      rating: 4.6,
      reviews: 1456
    },
    {
      id: 4,
      name: '서울',
      description: '전통과 현대가 공존하는 도시',
      image: 'https://readdy.ai/api/search-image?query=Seoul%20cityscape%20with%20modern%20skyscrapers%20and%20traditional%20Korean%20palace%2C%20vibrant%20urban%20life%20with%20Han%20River%2C%20dynamic%20metropolitan%20city%20showcasing%20both%20contemporary%20and%20historical%20elements&width=400&height=300&seq=seoul-1&orientation=landscape',
      rating: 4.9,
      reviews: 3521
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">인기 여행지</h2>
          <p className="text-lg text-gray-600">많은 여행자들이 선택한 추천 여행지를 만나보세요</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover object-top rounded-t-xl"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center space-x-1">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400 text-xs"></i>
                  </div>
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-3">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{destination.reviews.toLocaleString()}개 리뷰</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer whitespace-nowrap">
                    자세히 보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
