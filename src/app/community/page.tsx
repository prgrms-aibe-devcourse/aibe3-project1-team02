
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', name: '전체', icon: 'ri-global-line' },
    { id: 'review', name: '여행후기', icon: 'ri-star-line' },
    { id: 'question', name: '질문/답변', icon: 'ri-question-line' },
    { id: 'tip', name: '여행팁', icon: 'ri-lightbulb-line' },
    { id: 'companion', name: '동행구인', icon: 'ri-group-line' }
  ];

  const posts = [
    {
      id: 1,
      type: 'review',
      title: '제주도 3박 4일 완벽 가이드 (사진 많음)',
      content: '제주도 여행 다녀왔는데 정말 좋았어요! 특히 성산일출봉에서 본 일출이 정말 감동적이었습니다. 렌터카 빌려서 돌아다니니까 자유롭게 구경할 수 있어서 좋았고...',
      author: '여행러버',
      avatar: 'https://readdy.ai/api/search-image?query=Friendly%20Korean%20traveler%20profile%20photo%2C%20young%20person%20with%20warm%20smile%2C%20casual%20travel%20outfit%2C%20bright%20and%20positive%20atmosphere&width=50&height=50&seq=avatar-1&orientation=squarish',
      location: '제주도',
      date: '2024-01-15',
      views: 1247,
      likes: 89,
      comments: 23,
      tags: ['제주도', '후기', '렌터카'],
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20Seongsan%20Ilchulbong%20sunrise%20with%20orange%20sky%2C%20peaceful%20ocean%20view%2C%20iconic%20volcanic%20crater%20formation%20with%20dramatic%20morning%20light&width=300&height=200&seq=jeju-review-1&orientation=landscape'
    },
    {
      id: 2,
      type: 'question',
      title: '일본 여행 JR패스 꼭 사야하나요?',
      content: '도쿄-오사카-교토 일정으로 7일 여행 계획 중인데, JR패스를 살지 말지 고민이에요. 경험 있으신 분들 조언 부탁드려요!',
      author: '초보여행자',
      avatar: 'https://readdy.ai/api/search-image?query=Curious%20young%20Korean%20person%20asking%20questions%2C%20friendly%20and%20approachable%20appearance%2C%20casual%20style%20with%20questioning%20expression&width=50&height=50&seq=avatar-2&orientation=squarish',
      location: '일본',
      date: '2024-01-14',
      views: 892,
      likes: 34,
      comments: 45,
      tags: ['일본', '교통', 'JR패스']
    },
    {
      id: 3,
      type: 'tip',
      title: '유럽 배낭여행 짐 싸는 꿀팁 10가지',
      content: '유럽 한 달 배낭여행을 다녀온 경험을 바탕으로 짐 싸는 노하우를 공유합니다. 무게를 줄이면서도 필요한 건 다 챙기는 방법!',
      author: '배낭여행고수',
      avatar: 'https://readdy.ai/api/search-image?query=Experienced%20backpacker%20with%20travel%20gear%2C%20confident%20and%20knowledgeable%20appearance%2C%20outdoor%20adventure%20style%20clothing&width=50&height=50&seq=avatar-3&orientation=squarish',
      location: '유럽',
      date: '2024-01-13',
      views: 2156,
      likes: 156,
      comments: 67,
      tags: ['유럽', '배낭여행', '패킹팁'],
      image: 'https://readdy.ai/api/search-image?query=Well%20organized%20travel%20backpack%20with%20essential%20items%2C%20minimalist%20packing%20setup%2C%20travel%20accessories%20neatly%20arranged%20on%20clean%20background&width=300&height=200&seq=packing-tip-1&orientation=landscape'
    },
    {
      id: 4,
      type: 'companion',
      title: '2월 동남아 여행 같이 하실 분!',
      content: '2월 중순 태국-베트남 2주 여행 계획 중입니다. 20대 후반 여성이고, 같이 여행하실 분 찾아요. 자유여행 경험 많으시면 더 좋겠어요!',
      author: '아시아여행매니아',
      avatar: 'https://readdy.ai/api/search-image?query=Friendly%20young%20Korean%20woman%20traveler%2C%20warm%20smile%2C%20casual%20travel%20outfit%2C%20approachable%20and%20sociable%20personality&width=50&height=50&seq=avatar-4&orientation=squarish',
      location: '동남아',
      date: '2024-01-12',
      views: 634,
      likes: 28,
      comments: 18,
      tags: ['동남아', '동행구인', '자유여행']
    },
    {
      id: 5,
      type: 'review',
      title: '부산 2박 3일 맛집 투어 후기 (찐맛집만)',
      content: '부산 토박이 친구 추천으로 진짜 맛집들만 골라서 다녀왔어요. 관광지 맛집 말고 현지인들이 진짜 가는 곳들! 사진과 함께 리뷰 남겨요.',
      author: '맛집헌터',
      avatar: 'https://readdy.ai/api/search-image?query=Food%20enthusiast%20with%20happy%20expression%2C%20holding%20chopsticks%20or%20food%2C%20warm%20and%20cheerful%20personality%2C%20casual%20dining%20atmosphere&width=50&height=50&seq=avatar-5&orientation=squarish',
      location: '부산',
      date: '2024-01-11',
      views: 1834,
      likes: 127,
      comments: 56,
      tags: ['부산', '맛집', '현지맛집'],
      image: 'https://readdy.ai/api/search-image?query=Delicious%20Korean%20seafood%20dishes%20in%20Busan%2C%20fresh%20sashimi%20and%20grilled%20fish%2C%20authentic%20local%20restaurant%20atmosphere%20with%20traditional%20Korean%20dining%20setup&width=300&height=200&seq=busan-food-1&orientation=landscape'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === 'all' || post.type === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'review': return '여행후기';
      case 'question': return '질문';
      case 'tip': return '팁';
      case 'companion': return '동행구인';
      default: return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'question': return 'bg-green-100 text-green-800';
      case 'tip': return 'bg-purple-100 text-purple-800';
      case 'companion': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">여행후기</h1>
          <p className="text-xl text-blue-100">여행자들과 소중한 경험을 나누어보세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
                <input
                  type="text"
                  placeholder="궁금한 여행지나 키워드를 검색해보세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium">
              글쓰기
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${tab.icon} text-sm`}></i>
                </div>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/community/${post.id}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover object-top"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                        {getTypeLabel(post.type)}
                      </span>
                      <span className="text-sm text-gray-600">{post.location}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{post.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    
                    {post.image && (
                      <div className="mb-4">
                        <img
                          src={post.image}
                          alt="Post image"
                          className="w-full max-w-md h-40 object-cover object-top rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span className="font-medium">{post.author}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-eye-line text-xs"></i>
                          </div>
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-heart-line text-xs"></i>
                          </div>
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-chat-3-line text-xs"></i>
                          </div>
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer whitespace-nowrap">
            더 많은 글 보기
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
