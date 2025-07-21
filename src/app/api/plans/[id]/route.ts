import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request, context: { params: { id: string } }) {
    const params = await context.params
    const id = params.id

    try {
        const { data, error } = await supabaseAdmin
            .from('travel_plan')
            .select('*, destination(name)')
            .eq('id', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ success: false, error: '해당 계획을 찾을 수 없습니다.' }, { status: 404 })
            }
            throw error
        }

        const planData = {
            ...data,
            destination: data.destination ? (data.destination as any).name : '알 수 없는 여행지',
        }

        return NextResponse.json({ success: true, plan: planData })
    } catch (err: any) {
        console.error(`GET /api/plans/${id} Error:`, err.message)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    const params = await context.params
    const id = params.id
    const body = await request.json()

    const { error } = await supabaseAdmin.from('travel_plan').update(body).eq('id', id)

    if (error) {
        console.error(`PATCH /api/plans/${id} Error:`, error.message)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: '성공적으로 업데이트되었습니다.' })
}
