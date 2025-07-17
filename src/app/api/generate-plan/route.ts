import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { destination, dates, travelers, budget, interests } = body

    const prompt = `
당신은 똑똑한 여행 플래너 AI입니다.
다음 정보를 바탕으로 각 날짜별 일정(오전/오후/저녁)을 생성해주세요.

- 여행지: ${destination}
- 출발일: ${dates.start}
- 도착일: ${dates.end}
- 인원: ${travelers}
- 예산: ${budget}
- 관심사: ${interests.join(', ')}

반드시 출발일(${dates.start})부터 도착일(${
        dates.end
    })까지의 날짜만 포함하고, 날짜별로 하나씩만 일정이 생성되게 하세요. 예를 들어 1박 2일(이틀)이면 두 날짜만, 3박 4일(네 날짜)이면 네 날짜만 반환하세요.

날짜는 "YYYY-MM-DD" 형식만 사용하세요.
JSON 배열만 반환하세요. 그 외 날짜, 설명, 예시는 포함하지 마세요.

예시:
[
  {
    "date": "2025-08-01",
    "morning": "호텔 체크인 및 주변 산책",
    "afternoon": "루브르 박물관 관람",
    "evening": "세느강 유람선 디너"
  },
  {
    "date": "2025-08-02",
    "morning": "에펠탑 관람",
    "afternoon": "몽마르뜨 언덕 산책",
    "evening": "파리 야경 감상"
  }
]
`

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        })

        let content = response.choices[0].message.content || '[]'
        if (content.includes('```')) {
            content = content.replace(/```json|```/g, '').trim()
        }
        let plan = JSON.parse(content)

        // 출발일~도착일 구간만 필터링(혹시 불필요한 날짜가 포함될 경우)
        if (dates.start && dates.end) {
            const start = new Date(dates.start)
            const end = new Date(dates.end)
            plan = plan.filter((item: any) => {
                const date = new Date(item.date)
                return date >= start && date <= end
            })
        }

        return NextResponse.json({ success: true, plan })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
