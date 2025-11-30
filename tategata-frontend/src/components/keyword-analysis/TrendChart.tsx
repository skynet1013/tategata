export function TrendChart() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">時系列推移（過去30日）</h3>
            <div className="mt-6 flex h-64 items-end justify-between space-x-1">
                {[...Array(30)].map((_, i) => {
                    // Generate a somewhat random height for the chart bars to look like a trend
                    const height = 30 + (Math.sin(i * 0.5) * 20 + 25) + (i > 15 ? 20 : 0);
                    return (
                        <div key={i} className="group relative flex w-full flex-col justify-end">
                            <div
                                className="w-full rounded-t bg-blue-500 opacity-80 transition-opacity hover:opacity-100"
                                style={{ height: `${height}%` }}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>30日前</span>
                <span>15日前</span>
                <span>今日</span>
            </div>
        </div>
    );
}
