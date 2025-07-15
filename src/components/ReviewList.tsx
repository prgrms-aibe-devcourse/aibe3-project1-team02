
'use client';
import { useState } from 'react';

interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: '김여행',
    rating: 5,
    comment: '정말 완벽한 제주도 여행이었습니다! 가이드분도 친절하시고 일정도 알차게 구성되어 있어서 너무 만족스러웠어요. 특히 한라산 등반과 성산일출봉에서의 일출은 평생 잊지 못할 추억이 될 것 같습니다.',
    date: '2024-01-15',
    helpful: 24,
    images: [
      'https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20Hallasan%20mountain%20peak%20with%20tourists%2C%20clear%20blue%20sky%20and%20natural%20landscape%2C%20travel%20photography&width=300&height=200&seq=review1&orientation=landscape'
    ]
  },
  {
    id: '2',
    productId: '1',
    userName: '박휴양',
    rating: 4,
    comment: '가족과 함께 다녀왔는데 아이들도 너무 좋아했어요. 숙소도 깨끗하고 음식도 맛있었습니다. 다만 일정이 조금 빡빡한 느낌이 있어서 좀 더 여유롭게 즐길 수 있었으면 좋겠어요.',
    date: '2024-01-10',
    helpful: 18
  },
  {
    id: '3',
    productId: '1',
    userName: '이힐링',
    rating: 5,
    comment: '혼자 여행으로 갔는데 정말 좋았습니다. 다른 참가자들과도 금방 친해져서 즐거운 시간을 보냈어요. 제주의 자연을 만끽할 수 있는 완벽한 코스였습니다.',
    date: '2024-01-05',
    helpful: 12
  },
  {
    id: '4',
    productId: '2',
    userName: '최바다',
    rating: 4,
    comment: '부산의 바다를 실컷 즐길 수 있어서 좋았어요. 해운대와 광안리 모두 아름다웠고, 특히 밤에 보는 광안대교가 인상적이었습니다.',
    date: '2024-01-08',
    helpful: 15
  }
];

interface ReviewListProps {
  productId?: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews] = useState<Review[]>(mockReviews);
  const [sortBy, setSortBy] = useState<string>('최신순');
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  const sortOptions = ['최신순', '평점높은순', '평점낮은순', '도움순'];

  const filteredReviews = productId 
    ? reviews.filter(review => review.productId === productId)
    : reviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case '평점높은순':
        return b.rating - a.rating;
      case '평점낮은순':
        return a.rating - b.rating;
      case '도움순':
        return b.helpful - a.helpful;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const handleHelpful = (reviewId: string) => {
    if (helpfulReviews.has(reviewId)) {
      setHelpfulReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    } else {
      setHelpfulReviews(prev => new Set([...prev, reviewId]));
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="w-4 h-4 flex items-center justify-center">
            <i className={`ri-star-${star <= rating ? 'fill' : 'line'} text-yellow-400`}></i>
          </div>
        ))}
        <span className="ml-1 text-sm font-medium">{rating}.0</span>
      </div>
    );
  };

  const averageRating = filteredReviews.length > 0 
    ? (filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              리뷰 ({filteredReviews.length}개)
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-star-fill text-yellow-400"></i>
                </div>
                <span className="text-xl font-semibold">{averageRating}</span>
              </div>
              {renderStars(Math.round(Number(averageRating)))}
            </div>
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

      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {review.userName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{review.userName}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {review.comment}
            </p>
            
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`리뷰 이미지 ${index + 1}`}
                    className="w-24 h-24 object-cover object-top rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => handleHelpful(review.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
                  helpfulReviews.has(review.id)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-thumb-up-${helpfulReviews.has(review.id) ? 'fill' : 'line'}`}></i>
                </div>
                도움됨 {review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)}
              </button>
              
              <button className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer">
                신고
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {sortedReviews.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
            <i className="ri-chat-3-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">아직 리뷰가 없습니다</h3>
          <p className="text-gray-600">첫 번째 리뷰를 작성해보세요!</p>
        </div>
      )}
    </div>
  );
}
