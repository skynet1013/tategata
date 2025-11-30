import { BenchmarkList } from '@/components/account-analysis/BenchmarkList';
import { BenchmarkChart } from '@/components/account-analysis/BenchmarkChart';
import { PostAnalysisTable } from '@/components/account-analysis/PostAnalysisTable';
import { ExportButton } from '@/components/common/ExportButton';

export default function AccountAnalysisPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">アカウント分析</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        競合アカウントの動向を把握し、自社アカウントの成長戦略を立てましょう。
                    </p>
                </div>
                <ExportButton />
            </div>

            <BenchmarkList />
            <BenchmarkChart />
            <PostAnalysisTable />
        </div>
    );
}
