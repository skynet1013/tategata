import { PlanGenerator } from '@/components/content-planning/PlanGenerator';

export default function ContentPlanningPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">AI企画書作成</h1>
                <p className="mt-2 text-sm text-gray-500">
                    AIを活用して、バズるTikTok動画の構成案を瞬時に作成します。<br />
                    ターゲットや雰囲気を指定するだけで、具体的な台本構成まで提案します。
                </p>
            </div>

            <PlanGenerator />
        </div>
    );
}
