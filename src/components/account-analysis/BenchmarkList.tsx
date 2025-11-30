'use client';

import { Plus, Trash2, ExternalLink, X, Edit2 } from 'lucide-react';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        account_name: '',
        platform: 'tiktok',
        followers: '',
        engagement_rate: '',
        image: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchBenchmarks();
    }, []);

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

    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            account_name: '',
            platform: 'tiktok',
            followers: '',
            engagement_rate: '',
            image: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (benchmark: Benchmark) => {
        setEditingId(benchmark.id);
        setFormData({
            account_name: benchmark.account_name,
            platform: benchmark.platform,
            followers: benchmark.followers.toString(),
            engagement_rate: benchmark.engagement_rate.toString(),
            image: benchmark.image || ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const method = editingId ? 'PUT' : 'POST';
            const body: any = {
                account_name: formData.account_name,
                platform: formData.platform,
                followers: parseInt(formData.followers) || 0,
                engagement_rate: parseFloat(formData.engagement_rate) || 0,
                image: formData.image || null
            };

            if (editingId) {
                body.id = editingId;
            }

            const res = await fetch('/api/benchmarks', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                const data = await res.json();
                if (editingId) {
                    setBenchmarks(benchmarks.map(b => b.id === editingId ? data.data : b));
                } else {
                    setBenchmarks([data.data, ...benchmarks]);
                }
                setIsModalOpen(false);
            } else {
                alert(editingId ? 'アカウントの更新に失敗しました' : 'アカウントの追加に失敗しました');
            }
        } catch (error) {
            console.error('Failed to save benchmark:', error);
            alert('エラーが発生しました');
        } finally {
            setSubmitting(false);
        }
    };

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
        <>
            <div className="rounded-lg bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">ベンチマークアカウント</h3>
                    <button
                        onClick={openAddModal}
                        className="flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                    >
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
                                            onClick={() => openEditModal(account)}
                                            className="rounded-full p-1 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <Edit2 className="h-4 w-4" />
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {editingId ? 'ベンチマークアカウントを編集' : 'ベンチマークアカウントを追加'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    アカウント名 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.account_name}
                                    onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="@username"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    プラットフォーム
                                </label>
                                <select
                                    value={formData.platform}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="tiktok">TikTok</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="youtube">YouTube</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    フォロワー数
                                </label>
                                <input
                                    type="number"
                                    value={formData.followers}
                                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="10000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    エンゲージメント率 (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.engagement_rate}
                                    onChange={(e) => setFormData({ ...formData, engagement_rate: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="5.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    画像URL（オプション）
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    キャンセル
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {submitting ? '保存中...' : (editingId ? '更新' : '追加')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
