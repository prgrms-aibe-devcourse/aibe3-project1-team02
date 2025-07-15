
'use client';

export default function Features() {
  const features = [
    {
      icon: 'ri-map-pin-line',
      title: 'AI 맞춤 추천',
      description: '당신의 취향과 예산에 맞는 완벽한 여행지를 AI가 추천해드립니다'
    },
    {
      icon: 'ri-calendar-line',
      title: '스마트 일정 관리',
      description: '최적화된 루트와 시간 배분으로 효율적인 여행 계획을 세워보세요'
    },
    {
      icon: 'ri-group-line',
      title: '여행 커뮤니티',
      description: '다른 여행자들과 경험을 공유하고 유용한 정보를 얻어보세요'
    },
    {
      icon: 'ri-smartphone-line',
      title: '모바일 최적화',
      description: '언제 어디서나 편리하게 여행 계획을 확인하고 수정할 수 있습니다'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 TripPlan을 선택해야 할까요?</h2>
          <p className="text-lg text-gray-600">스마트한 기능으로 더 나은 여행을 경험하세요</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                <i className={`${feature.icon} text-2xl text-blue-600`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
