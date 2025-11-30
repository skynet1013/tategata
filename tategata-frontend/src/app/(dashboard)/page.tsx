import { TrendingUp, Users, PlayCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat Card 1 */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">総再生数</h3>
            <PlayCircle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">2.4M</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
              12%
            </p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">フォロワー増減</h3>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">+1,234</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
              4.5%
            </p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">エンゲージメント率</h3>
            <TrendingUp className="h-5 w-5 text-orange-500" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">5.8%</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
              <ArrowDownRight className="h-4 w-4 flex-shrink-0 self-center text-red-500" />
              0.5%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Trends */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">急上昇トレンド</h3>
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    {i}
                  </span>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">#猫ミーム</p>
                    <p className="text-sm text-gray-500">1.2M 視聴</p>
                  </div>
                </div>
                <div className="text-sm text-green-600">+24%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Activity */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">競合アクティビティ</h3>
          <div className="mt-4 space-y-4">
            {[
              { id: 1, name: 'Competitor A', action: '新しい動画を投稿しました: "夏の新作コスメ..."', time: '2時間前', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
              { id: 2, name: 'Competitor B', action: 'トレンドに参加しました: "#猫ミーム"', time: '5時間前', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
              { id: 3, name: 'Competitor C', action: 'ライブ配信を開始しました', time: '1日前', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coco' },
            ].map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="h-10 w-10 rounded-full bg-gray-200 object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                  <p className="mt-1 text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
