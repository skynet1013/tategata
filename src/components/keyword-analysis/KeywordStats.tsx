import { BarChart2, Eye, Video } from 'lucide-react';

export function KeywordStats() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">関連動画数</h3>
                    <Video className="h-5 w-5 text-blue-500" />
                </div>
                <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">12.5K</p>
                    <span className="ml-2 text-sm font-medium text-green-600">+12%</span>
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">総再生数</h3>
                    <Eye className="h-5 w-5 text-purple-500" />
                </div>
                <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">45.2M</p>
                    <span className="ml-2 text-sm font-medium text-green-600">+8.5%</span>
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">平均エンゲージメント</h3>
                    <BarChart2 className="h-5 w-5 text-orange-500" />
                </div>
                <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">6.2%</p>
                    <span className="ml-2 text-sm font-medium text-red-600">-1.2%</span>
                </div>
            </div>
        </div>
    );
}
