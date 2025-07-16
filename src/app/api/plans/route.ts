import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        const { error } = await supabaseAdmin.from('travel_plan').insert([data])

        if (error) {
            console.error('Insert Error:', error.message)
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (err: any) {
        console.error('POST /api/plans Error:', err.message)
        return NextResponse.json({ success: false, error: 'Invalid JSON or internal error' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('travel_plan')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Fetch Error:', error.message)
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, plans: data })
    } catch (err: any) {
        console.error('GET /api/plans Error:', err.message)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
