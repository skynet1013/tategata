import { PlayCircle, Heart, MessageCircle, Share2 } from 'lucide-react';

const posts = [
    {
        id: 1,
        image: 'https://placehold.co/600x400/ff7b00/ffffff?text=Makeup',
        title: '夏の新作コスメ全色レビュー！',
        date: '2023-06-15',
        views: '1.2M',
        likes: '45K',
        comments: '342',
        shares: '1.2K',
        engagement: '4.2%',
    },
    {
        id: 2,
        image: 'https://placehold.co/600x400/007bff/ffffff?text=LifeHack',
        title: '【検証】この裏技本当？',
        date: '2023-06-12',
        views: '850K',
        likes: '32K',
        comments: '890',
        shares: '5.1K',
        engagement: '5.8%',
    },
    {
        id: 3,
        image: 'https://placehold.co/600x400/e83e8c/ffffff?text=GRWM',
        title: 'GRWM デートに行く日の準備',
        date: '2023-06-10',
        views: '500K',
        likes: '12K',
        comments: '120',
        shares: '300',
        engagement: '2.5%',
    },
];

export function PostAnalysisTable() {
    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">投稿分析</h3>
            </div>
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
                                            src={post.image}
                                            alt={post.title}
                                            className="h-10 w-10 flex-shrink-0 rounded-md object-cover"
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                            <div className="text-sm text-gray-500">{post.date}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.views}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.likes}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.comments}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.shares}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{post.engagement}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
