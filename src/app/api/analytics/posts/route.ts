import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const supabase = await createClient()

        // Get user's benchmark accounts
        const { data: benchmarks } = await supabase
            .from('benchmark_accounts')
            .select('id')
            .eq('user_id', session.user.id)

        if (!benchmarks || benchmarks.length === 0) {
            return NextResponse.json({ data: [] })
        }

        const benchmarkIds = benchmarks.map(b => b.id)

        // Get posts for those benchmarks
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .in('benchmark_account_id', benchmarkIds)
            .order('posted_at', { ascending: false })
            .limit(50)

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json({ data })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
