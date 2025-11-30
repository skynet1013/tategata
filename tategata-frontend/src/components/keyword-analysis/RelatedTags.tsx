import { Hash } from 'lucide-react';

const relatedTags = [
    { name: 'プチプラコスメ', volume: '8.5M' },
    { name: '韓国コスメ', volume: '6.2M' },
    { name: 'メイク動画', volume: '4.1M' },
    { name: '新作コスメ', volume: '3.8M' },
    { name: 'コスメレビュー', volume: '2.9M' },
    { name: '毎日メイク', volume: '2.5M' },
];

export function RelatedTags() {
    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="flex items-center text-lg font-medium text-gray-900">
                    <Hash className="mr-2 h-5 w-5 text-gray-400" />
                    関連タグ
                </h3>
            </div>
            <ul className="divide-y divide-gray-200">
                {relatedTags.map((tag) => (
                    <li key={tag.name} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                        <span className="text-sm font-medium text-gray-900">#{tag.name}</span>
                        <span className="text-sm text-gray-500">{tag.volume} 視聴</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
