import React, { useState, useEffect } from 'react'

const budgetTextMap: Record<'low' | 'medium' | 'high' | 'luxury', string> = {
    low: '50만원 이하',
    medium: '50-100만원',
    high: '100-200만원',
    luxury: '200만원 이상',
}

export default function TravelPlanEditor({
    planData,
    interests,
    loading,
    error,
    generatedPlan,
    setGeneratedPlan,
    handleGeneratePlan,
    handleSavePlan,
}: any) {
    const [isEditing, setIsEditing] = useState(false)
    const [editingPlan, setEditingPlan] = useState(generatedPlan)

    React.useEffect(() => {
        setEditingPlan(generatedPlan)
    }, [generatedPlan])

    const handleEditPlan = () => setIsEditing(true)
    const handleEditDayField = (dayIdx: number, time: string, value: string) => {
        setEditingPlan((prev: any[]) => prev.map((d, idx) => (idx === dayIdx ? { ...d, [time]: value } : d)))
    }
    const handleSaveEditedPlan = () => {
        setGeneratedPlan(editingPlan)
        setIsEditing(false)
    }

    return (
        <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-green-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4">여행 계획이 완성되었습니다!</h2>

            <button
                onClick={handleGeneratePlan}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mb-6"
            >
                맞춤 일정 확인하기
            </button>

            {loading && <p className="text-blue-500">AI가 일정을 생성 중입니다...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {!loading && generatedPlan.length > 0 && (
                <div className="text-left mt-10">
                    <div className="bg-gray-50 p-6 rounded-lg border mb-6">
                        <h3 className="text-lg font-semibold mb-4">📋 여행 계획 요약</h3>
                        <p>🗺 여행지: {planData.destination}</p>
                        <p>
                            📆 일정: {planData.dates.start} ~ {planData.dates.end}
                        </p>
                        <p>👥 인원: {planData.travelers}명</p>
                        <p>
                            💰 예산:{' '}
                            {budgetTextMap[planData.budget as 'low' | 'medium' | 'high' | 'luxury'] || '선택안함'}
                        </p>
                        <p>
                            🎯 관심사:{' '}
                            {planData.interests
                                .map((id: string) => interests.find((i: any) => i.id === id)?.name)
                                .join(', ')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-2">🗓 맞춤 일정</h3>
                        {isEditing
                            ? editingPlan.map((day: any, idx: number) => (
                                  <div key={idx} className="p-4 bg-white border rounded-lg shadow space-y-2">
                                      <h4 className="text-blue-600 font-semibold mb-2">{day.date}</h4>
                                      <ul className="text-sm space-y-1">
                                          {(['morning', 'afternoon', 'evening'] as const).map((time) => (
                                              <li key={time}>
                                                  <strong>
                                                      {time === 'morning'
                                                          ? '오전'
                                                          : time === 'afternoon'
                                                          ? '오후'
                                                          : '저녁'}
                                                      :
                                                  </strong>{' '}
                                                  <input
                                                      className="border px-2 py-1 rounded w-2/3"
                                                      value={day[time]}
                                                      onChange={(e) => handleEditDayField(idx, time, e.target.value)}
                                                  />
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                              ))
                            : generatedPlan.map((day: any, idx: number) => (
                                  <div key={idx} className="p-4 bg-white border rounded-lg shadow">
                                      <h4 className="text-blue-600 font-semibold mb-2">{day.date}</h4>
                                      <ul className="text-sm">
                                          <li>
                                              <strong>오전:</strong> {day.morning}
                                          </li>
                                          <li>
                                              <strong>오후:</strong> {day.afternoon}
                                          </li>
                                          <li>
                                              <strong>저녁:</strong> {day.evening}
                                          </li>
                                      </ul>
                                  </div>
                              ))}
                    </div>

                    <div className="text-center mt-8 flex flex-col gap-4 items-center">
                        {!isEditing && (
                            <button
                                onClick={handleEditPlan}
                                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                            >
                                일정 수정하기
                            </button>
                        )}
                        {isEditing && (
                            <button
                                onClick={handleSaveEditedPlan}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                            >
                                수정 완료
                            </button>
                        )}
                        <button
                            onClick={handleSavePlan}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            여행 계획 저장하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
