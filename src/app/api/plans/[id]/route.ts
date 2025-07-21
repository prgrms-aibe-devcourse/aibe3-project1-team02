import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
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
    } catch (err: unknown) {
        const errorMsg =
            err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'Unknown error'
        console.error(`GET /api/plans/${id} Error:`, errorMsg)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const body = await request.json()
    const { error } = await supabaseAdmin.from('travel_plan').update(body).eq('id', id)

    if (error) {
        console.error(`PATCH /api/plans/${id} Error:`, error.message)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: '성공적으로 업데이트되었습니다.' })
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params

    try {
        const { error } = await supabaseAdmin.from('travel_plan').delete().eq('id', id)

        if (error) {
            throw error
        }

        return NextResponse.json({ success: true, message: '성공적으로 삭제되었습니다.' })
    } catch (err: unknown) {
        const errorMsg =
            err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'Unknown error'
        console.error(`DELETE /api/plans/${id} Error:`, errorMsg)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
