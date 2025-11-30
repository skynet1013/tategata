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

        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') || 'posts'

        const supabase = await createClient()

        let data: any[] = []

        if (type === 'posts') {
            // Get user's benchmark accounts
            const { data: benchmarks } = await supabase
                .from('benchmark_accounts')
                .select('id')
                .eq('user_id', session.user.id)

            if (!benchmarks || benchmarks.length === 0) {
                return new NextResponse('No data', {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/csv',
                        'Content-Disposition': 'attachment; filename="posts.csv"'
                    }
                })
            }

            const benchmarkIds = benchmarks.map(b => b.id)

            const { data: posts } = await supabase
                .from('posts')
                .select('*')
                .in('benchmark_account_id', benchmarkIds)
                .order('posted_at', { ascending: false })

            data = posts || []
        } else if (type === 'trends') {
            const { data: trends } = await supabase
                .from('music_trends')
                .select('*')
                .order('rank', { ascending: true })

            data = trends || []
        } else if (type === 'keywords') {
            const { data: keywords } = await supabase
                .from('keywords')
                .select('*')
                .order('trend_score', { ascending: false })

            data = keywords || []
        }

        // Convert to CSV
        if (data.length === 0) {
            return new NextResponse('No data', {
                status: 200,
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename="${type}.csv"`
                }
            })
        }

        const headers = Object.keys(data[0])
        const csvRows = [
            headers.join(','),
            ...data.map(row =>
                headers.map(header => {
                    const value = row[header]
                    return typeof value === 'string' && value.includes(',')
                        ? `"${value}"`
                        : value
                }).join(',')
            )
        ]

        const csv = csvRows.join('\n')

        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${type}.csv"`
            }
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
