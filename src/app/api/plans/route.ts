import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
    const supabase = createServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

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
        user_id: user.id,
    }

    const { error } = await supabase.from('travel_plan').insert([data])

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}

export async function GET(req: NextRequest) {
    const supabase = createServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
        .from('travel_plan')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
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
}
