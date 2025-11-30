'use client';

import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface Benchmark {
    id: string;
    account_name: string;
    platform: string;
    followers: number;
    engagement_rate: number;
}

export function BenchmarkChart() {
    const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [metric, setMetric] = useState<'followers' | 'engagement_rate'>('followers');

    useEffect(() => {
        const fetchBenchmarks = async () => {
            try {
                const res = await fetch('/api/benchmarks');
                const data = await res.json();
                if (data.data) {
                    setBenchmarks(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch benchmarks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBenchmarks();
    }, []);

    if (loading) {
        return <div className="h-64 flex items-center justify-center text-gray-500">読み込み中...</div>;
    }

    if (benchmarks.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                データがありません。ベンチマークアカウントを追加してください。
            </div>
        );
    }

    // データ整形
    const chartData = benchmarks.map(b => ({
        name: b.account_name,
        followers: b.followers,
        engagement_rate: b.engagement_rate,
        platform: b.platform
    }));

    // プラットフォームごとの色設定
    const getBarColor = (platform: string) => {
        switch (platform) {
            case 'tiktok': return '#000000'; // TikTok Black
            case 'instagram': return '#E1306C'; // Instagram Pink
            case 'youtube': return '#FF0000'; // YouTube Red
            default: return '#3B82F6'; // Default Blue
        }
    };

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">アカウント比較</h3>
                <div className="flex space-x-2 rounded-md bg-gray-100 p-1">
                    <button
                        onClick={() => setMetric('followers')}
                        className={`rounded px-3 py-1 text-sm font-medium transition-colors ${metric === 'followers'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        フォロワー数
                    </button>
                    <button
                        onClick={() => setMetric('engagement_rate')}
                        className={`rounded px-3 py-1 text-sm font-medium transition-colors ${metric === 'engagement_rate'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        エンゲージメント率
                    </button>
                </div>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            formatter={(value: number) => [
                                metric === 'followers' ? value.toLocaleString() : `${value}%`,
                                metric === 'followers' ? 'フォロワー数' : 'エンゲージメント率'
                            ]}
                        />
                        <Bar
                            dataKey={metric}
                            radius={[4, 4, 0, 0]}
                            name={metric === 'followers' ? 'フォロワー数' : 'エンゲージメント率'}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.platform)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
