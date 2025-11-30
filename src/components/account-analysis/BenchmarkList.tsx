'use client';

import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Benchmark {
    id: string;
    account_name: string;
    platform: string;
    followers: number;
    engagement_rate: number;
    image: string | null;
}

export function BenchmarkList() {
    const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (id: string) => {
        if (!confirm('本当に削除しますか？')) return;

        try {
            const res = await fetch(`/api/benchmarks?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setBenchmarks(benchmarks.filter(b => b.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete benchmark:', error);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">読み込み中...</div>;
    }

    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">ベンチマークアカウント</h3>
                <button className="flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500">
                    <Plus className="mr-2 h-4 w-4" />
                    追加
                </button>
            </div>
            {benchmarks.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    ベンチマークアカウントが登録されていません。
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {benchmarks.map((account) => (
                        <li key={account.id} className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center">
                                <img
                                    src={account.image || `https://ui-avatars.com/api/?name=${account.account_name}`}
                                    alt={account.account_name}
                                    className="h-10 w-10 rounded-full bg-gray-200 object-cover"
                                />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{account.account_name}</p>
                                    <p className="text-sm text-gray-500">{account.platform}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{account.followers.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">フォロワー</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                        <ExternalLink className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(account.id)}
                                        className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
