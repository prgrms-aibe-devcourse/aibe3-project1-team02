import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
    const data = await req.json()

    const { error } = await supabaseAdmin.from('plans').insert([data])

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}

export async function GET() {
    const { data, error } = await supabaseAdmin.from('plans').select('*').order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, plans: data })
}
