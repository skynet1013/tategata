export function ComparisonCharts() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Engagement Rate Comparison */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">エンゲージメント率比較</h3>
                <div className="mt-6 space-y-4">
                    {[
                        { label: '自社アカウント', value: 5.8, color: 'bg-blue-500' },
                        { label: 'Competitor A', value: 4.2, color: 'bg-gray-300' },
                        { label: 'Competitor B', value: 6.1, color: 'bg-gray-300' },
                    ].map((item) => (
                        <div key={item.label}>
                            <div className="flex justify-between text-sm font-medium text-gray-600">
                                <span>{item.label}</span>
                                <span>{item.value}%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                                <div
                                    className={`h-2 rounded-full ${item.color}`}
                                    style={{ width: `${(item.value / 10) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Follower Growth Comparison */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">フォロワー増加数（直近30日）</h3>
                <div className="mt-6 flex h-48 items-end justify-around space-x-2">
                    {[
                        { label: '自社', value: 1234, height: '60%', color: 'bg-blue-500' },
                        { label: 'Comp A', value: 2100, height: '80%', color: 'bg-gray-300' },
                        { label: 'Comp B', value: 800, height: '40%', color: 'bg-gray-300' },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center">
                            <span className="mb-1 text-xs font-medium text-gray-600">+{item.value}</span>
                            <div
                                className={`w-12 rounded-t-md ${item.color}`}
                                style={{ height: item.height }}
                            />
                            <span className="mt-2 text-xs text-gray-500">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
