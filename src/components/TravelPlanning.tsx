'use client'

export default function TravelPlanning() {
    const steps = [
        {
            step: '01',
            title: '여행지 선택',
            description: '원하는 여행지와 테마를 선택해주세요',
        },
        {
            step: '02',
            title: '일정 생성',
            description: 'AI가 최적의 일정을 자동으로 생성해드립니다',
        },
        {
            step: '03',
            title: '커스터마이징',
            description: '생성된 일정을 자유롭게 수정하고 개인화하세요',
        },
        {
            step: '04',
            title: '여행 출발',
            description: '완성된 계획으로 멋진 여행을 떠나보세요',
        },
    ]

    return (
        <section className="py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">간단한 4단계로 완성하는 여행 계획</h2>
                    <p className="text-lg text-gray-600">복잡한 여행 계획도 이제 쉽고 빠르게</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    {step.step}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 transform translate-x-8"></div>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium text-lg">
                        지금 시작하기
                    </button>
                </div>
            </div>
        </section>
    )
}
