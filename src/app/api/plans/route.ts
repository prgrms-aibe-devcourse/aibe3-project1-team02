import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// POST 함수: 새로운 계획을 생성합니다.
export async function POST(req: NextRequest) {
    const raw = await req.json()

    if (!raw.user_id) {
        return NextResponse.json({ success: false, error: 'Missing user_id' }, { status: 400 })
    }

    // --- 1. 여행지 이름으로 destination 테이블에서 ID 조회 ---
    let destinationId: number | null = null
    if (raw.destination) {
        const { data: destData, error: destError } = await supabaseAdmin
            .from('destination')
            .select('id')
            .eq('name', raw.destination)
            .single()

        if (destError || !destData) {
            console.error('Destination lookup error:', destError)
            return NextResponse.json({ success: false, error: '해당 여행지를 찾을 수 없습니다.' }, { status: 404 })
        }
        destinationId = destData.id
    }

    // --- 2. 여행지 ID로 destination_image 테이블에서 이미지 URL 조회 ---
    let imageUrl = raw.image // 기본적으로 클라이언트에서 제공된 이미지를 사용합니다.
    if (!imageUrl && destinationId) {
        try {
            // destination_image 테이블에서 destination_id가 일치하는 첫 번째 이미지의 URL을 찾습니다.
            const { data: imageData, error: imageError } = await supabaseAdmin
                .from('destination image')
                .select('image_url')
                .eq('destination_id', destinationId)
                .limit(1) // 여러 이미지가 있을 경우 첫 번째 이미지를 사용합니다.
                .single()

            // 'PGRST116' 코드는 결과가 없음을 의미하며, 이는 에러가 아닐 수 있습니다. (이미지가 없는 여행지)
            if (imageError && imageError.code !== 'PGRST116') {
                throw imageError
            }

            // imageData가 존재하면 image_url을 사용하고, 없으면 null로 설정합니다.
            imageUrl = imageData ? imageData.image_url : null
        } catch (error) {
            console.error('destination_image 테이블에서 이미지 URL 조회 실패:', error)
            imageUrl = null
        }
    }

    // --- 3. 데이터베이스에 저장할 최종 데이터 구성 ---
    const dataToInsert = {
        title: raw.title || `${raw.destination} 여행 계획`,
        destination_id: destinationId, // 텍스트 이름 대신 ID를 저장합니다.
        start_date: raw.dates?.start || '',
        end_date: raw.dates?.end || '',
        travelers: raw.travelers,
        status: 'planning',
        budget: raw.budget,
        progress: raw.progress,
        image: imageUrl, // destination_image 테이블에서 가져온 URL을 저장합니다.
        user_id: raw.user_id,
        plan_details: raw.planDetails ?? null,
    }

    const { data: insertedData, error } = await supabaseAdmin.from('travel_plan').insert(dataToInsert).select()

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: insertedData[0].id })
}

// GET 함수: destination 테이블과 JOIN하여 여행지 이름을 함께 가져옵니다.
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
        return NextResponse.json({ success: false, error: 'Missing user_id' }, { status: 400 })
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('travel_plan')
            .select('*, destination(name)')
            .eq('user_id', user_id)
            .order('created_at', { ascending: false })

        if (error) {
            throw error
        }

        const plans = data.map((plan) => ({
            id: plan.id,
            title: plan.title,
            destination: plan.destination ? (plan.destination as any).name : '알 수 없는 여행지',
            startDate: plan.start_date,
            endDate: plan.end_date,
            travelers: plan.travelers,
            status: plan.status,
            budget: plan.budget,
            image: plan.image,
            progress: plan.progress,
            interests: plan.interests,
            planDetails: plan.plan_details,
        }))

        return NextResponse.json({ success: true, plans })
    } catch (err: any) {
        console.error('GET /api/plans Error:', err.message)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
