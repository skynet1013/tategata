import { Plus, Trash2, ExternalLink } from 'lucide-react';

const initialBenchmarks = [
    {
        id: 1,
        name: 'Competitor A',
        handle: '@competitor_a',
        followers: '1.2M',
        growth: '+2.3%',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    {
        id: 2,
        name: 'Competitor B',
        handle: '@competitor_b',
        followers: '850K',
        growth: '-0.5%',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
    },
    {
        id: 3,
        name: 'Taisei Tanida',
        handle: '@taisei_tanida',
        followers: '2.1M',
        growth: '+5.1%',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taisei'
    },
];

export function BenchmarkList() {
    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">ベンチマークアカウント</h3>
                <button className="flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500">
                    <Plus className="mr-2 h-4 w-4" />
                    追加
                </button>
            </div>
            <ul className="divide-y divide-gray-200">
                {initialBenchmarks.map((account) => (
                    <li key={account.id} className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <img
                                src={account.image}
                                alt={account.name}
                                className="h-10 w-10 rounded-full bg-gray-200 object-cover"
                            />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{account.name}</p>
                                <p className="text-sm text-gray-500">{account.handle}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{account.followers}</p>
                                <p className={`text-xs ${account.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {account.growth}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                    <ExternalLink className="h-4 w-4" />
                                </button>
                                <button className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
