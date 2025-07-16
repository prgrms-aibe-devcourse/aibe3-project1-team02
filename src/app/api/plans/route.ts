import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
    const raw = await req.json()

    const data = {
        title: `${raw.destination} 여행 계획`,
        destination: raw.destination,
        start_date: raw.dates?.start || '',
        end_date: raw.dates?.end || '',
        travelers: raw.travelers,
        status: 'planning',
        budget: raw.budget,
        progress: 30,
        image:
            raw.image ??
            `https://readdy.ai/api/search-image?query=${encodeURIComponent(
                raw.destination + ' 여행지',
            )}&width=300&height=200&seq=plan-${Date.now()}&orientation=landscape`,
    }

    const { error } = await supabaseAdmin.from('travel_plan').insert([data])

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('travel_plan')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Supabase fetch error:', error.message)
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }

        const plans = data.map((plan) => ({
            id: plan.id,
            title: plan.title,
            destination: plan.destination,
            startDate: plan.start_date,
            endDate: plan.end_date,
            travelers: plan.travelers,
            status: plan.status,
            budget: plan.budget,
            image: plan.image,
            progress: plan.progress,
        }))

        return NextResponse.json({ success: true, plans })
    } catch (err: any) {
        console.error('GET /api/plans Error:', err.message)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
