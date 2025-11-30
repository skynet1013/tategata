'use client';

import { PlayCircle, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Post {
    id: string;
    title: string;
    image: string | null;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    engagement_rate: number;
    posted_at: string;
}

export function PostAnalysisTable() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/analytics/posts');
                const data = await res.json();
                if (data.data) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">読み込み中...</div>;
    }

    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">投稿分析</h3>
            </div>
            {posts.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    データがありません。ベンチマークアカウントを追加してください。
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    投稿
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    <div className="flex items-center">
                                        <PlayCircle className="mr-1 h-4 w-4" /> 再生数
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    <div className="flex items-center">
                                        <Heart className="mr-1 h-4 w-4" /> いいね
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    <div className="flex items-center">
                                        <MessageCircle className="mr-1 h-4 w-4" /> コメント
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    <div className="flex items-center">
                                        <Share2 className="mr-1 h-4 w-4" /> シェア
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    エンゲージメント率
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <img
                                                src={post.image || 'https://placehold.co/600x400?text=No+Image'}
                                                alt={post.title}
                                                className="h-10 w-10 flex-shrink-0 rounded-md object-cover"
                                            />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                                <div className="text-sm text-gray-500">{new Date(post.posted_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.views.toLocaleString()}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.likes.toLocaleString()}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.comments.toLocaleString()}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.shares.toLocaleString()}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{post.engagement_rate}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
