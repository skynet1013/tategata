'use client';

import { TrendingUp, Music2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MusicTrend {
    id: string;
    rank: number;
    title: string;
    artist: string;
    uses: number;
    growth_rate: number;
    image_url: string | null;
}

export function MusicTrendList() {
    const [trends, setTrends] = useState<MusicTrend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const res = await fetch('/api/analytics/trends');
                const data = await res.json();
                if (data.data) {
                    setTrends(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch trends:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrends();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">読み込み中...</div>;
    }

    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="flex items-center text-lg font-medium text-gray-900">
                    <Music2 className="mr-2 h-5 w-5 text-blue-500" />
                    楽曲トレンドランキング
                </h3>
            </div>
            {trends.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    データがありません。
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {trends.map((trend) => (
                        <li key={trend.id} className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center">
                                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${trend.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {trend.rank}
                                </span>
                                <img
                                    src={trend.image_url || '/placeholder.png'}
                                    alt={trend.title}
                                    className="ml-4 h-12 w-12 rounded-md object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/48x48?text=Music';
                                    }}
                                />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{trend.title}</p>
                                    <p className="text-sm text-gray-500">{trend.artist}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{trend.uses.toLocaleString()} 投稿</p>
                                <div className={`flex items-center justify-end text-xs ${trend.growth_rate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    <TrendingUp className={`mr-1 h-3 w-3 ${trend.growth_rate >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                                    {trend.growth_rate > 0 ? '+' : ''}{trend.growth_rate}%
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
