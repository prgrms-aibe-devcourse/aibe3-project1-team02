import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        const { data, error } = await supabaseAdmin.from('travel_plan').select('*').eq('id', id).single()

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ success: false, error: '해당 계획을 찾을 수 없습니다.' }, { status: 404 })
            }
            throw error
        }

        return NextResponse.json({ success: true, plan: data })
    } catch (err: any) {
        console.error(`GET /api/plans/${id} Error:`, err.message)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
