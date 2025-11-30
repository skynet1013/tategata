import { KeywordSearch } from '@/components/keyword-analysis/KeywordSearch';
import { KeywordStats } from '@/components/keyword-analysis/KeywordStats';
import { RelatedTags } from '@/components/keyword-analysis/RelatedTags';
import { TrendChart } from '@/components/keyword-analysis/TrendChart';
import { ExportButton } from '@/components/common/ExportButton';

export default function KeywordAnalysisPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">キーワード分析</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        特定のキーワードに関するトレンド、ボリューム、関連タグを分析します。
                    </p>
                </div>
                <ExportButton />
            </div>

            <KeywordSearch />
            <KeywordStats />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <TrendChart />
                </div>
                <div>
                    <RelatedTags />
                </div>
            </div>
        </div>
    );
}
