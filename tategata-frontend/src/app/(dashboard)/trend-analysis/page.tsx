import { MusicTrendList } from '@/components/trend-analysis/MusicTrendList';
import { ExportButton } from '@/components/common/ExportButton';

export default function TrendAnalysisPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">トレンド分析</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        TikTokで現在流行している楽曲やハッシュタグをリアルタイムで分析します。
                    </p>
                </div>
                <ExportButton />
            </div>

            <MusicTrendList />
        </div>
    );
}
