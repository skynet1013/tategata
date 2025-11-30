'use client';

import { Hash } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Keyword {
    id: string;
    keyword: string;
    volume: number;
    trend_score: number;
}

export function RelatedTags() {
    const [tags, setTags] = useState<Keyword[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await fetch('/api/analytics/keywords');
                const data = await res.json();
                if (data.data) {
                    setTags(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">読み込み中...</div>;
    }

    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="flex items-center text-lg font-medium text-gray-900">
                    <Hash className="mr-2 h-5 w-5 text-gray-400" />
                    関連タグ
                </h3>
            </div>
            {tags.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    データがありません。
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {tags.map((tag) => (
                        <li key={tag.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                            <span className="text-sm font-medium text-gray-900">#{tag.keyword}</span>
                            <span className="text-sm text-gray-500">{tag.volume.toLocaleString()} 視聴</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
