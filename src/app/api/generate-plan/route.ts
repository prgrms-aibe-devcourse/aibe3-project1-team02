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

JSON 형식으로 아래 예시처럼 반환하세요 (코드 블록 없이 JSON만 반환하세요):

[
  {
    "date": "2025-08-01",
    "morning": "호텔 체크인 및 주변 산책",
    "afternoon": "루브르 박물관 관람",
    "evening": "세느강 유람선 디너"
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

        const plan = JSON.parse(content)

        return NextResponse.json({ success: true, plan })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
