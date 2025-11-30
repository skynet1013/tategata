import { TrendingUp, Music2 } from 'lucide-react';

const musicTrends = [
    { id: 1, rank: 1, title: 'Bling-Bang-Bang-Born', artist: 'Creepy Nuts', uses: '1.2M', growth: '+15%', image: '/BRING.jpeg' },
    { id: 2, rank: 2, title: '晩餐歌', artist: 'tuki.', uses: '850K', growth: '+8%', image: '/Bansanka.jpeg' },
    { id: 3, rank: 3, title: '唱', artist: 'Ado', uses: '2.1M', growth: '-2%', image: '/Ado.jpg' },
    { id: 4, rank: 4, title: 'アイドル', artist: 'YOASOBI', uses: '3.5M', growth: '-5%', image: '/YOASOBI.jpeg' },
    { id: 5, rank: 5, title: 'ランデヴー', artist: 'シャイトープ', uses: '500K', growth: '+12%', image: '/Shay.jpeg' },
];

export function MusicTrendList() {
    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="flex items-center text-lg font-medium text-gray-900">
                    <Music2 className="mr-2 h-5 w-5 text-blue-500" />
                    楽曲トレンドランキング
                </h3>
            </div>
            <ul className="divide-y divide-gray-200">
                {musicTrends.map((trend) => (
                    <li key={trend.id} className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${trend.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {trend.rank}
                            </span>
                            <img
                                src={trend.image}
                                alt={trend.title}
                                className="ml-4 h-12 w-12 rounded-md object-cover"
                            />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{trend.title}</p>
                                <p className="text-sm text-gray-500">{trend.artist}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{trend.uses} 投稿</p>
                            <div className={`flex items-center justify-end text-xs ${trend.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                <TrendingUp className={`mr-1 h-3 w-3 ${trend.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`} />
                                {trend.growth}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
