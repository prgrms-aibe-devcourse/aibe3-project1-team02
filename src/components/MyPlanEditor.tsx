import React, { useState, useEffect } from 'react'

export default function TravelPlanEditor({ loading, generatedPlan, setGeneratedPlan }: any) {
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
            {!loading && generatedPlan.length > 0 && (
                <div className="text-left mt-10">
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
                                className="w-52 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                            >
                                일정 수정하기
                            </button>
                        )}
                        {isEditing && (
                            <button
                                onClick={handleSaveEditedPlan}
                                className="w-52 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                            >
                                수정 완료
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
