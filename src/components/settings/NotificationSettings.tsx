import { Bell } from 'lucide-react';

export function NotificationSettings() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
                <Bell className="mr-2 h-5 w-5 text-gray-400" />
                通知設定
            </h3>
            <div className="mt-6 space-y-4">
                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                        <input
                            id="email-notifications"
                            name="email-notifications"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="email-notifications" className="font-medium text-gray-700">
                            メール通知
                        </label>
                        <p className="text-gray-500">重要なアップデートや週次レポートをメールで受け取る</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                        <input
                            id="push-notifications"
                            name="push-notifications"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="push-notifications" className="font-medium text-gray-700">
                            プッシュ通知
                        </label>
                        <p className="text-gray-500">ブラウザでリアルタイムの通知を受け取る</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                        <input
                            id="marketing-emails"
                            name="marketing-emails"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="marketing-emails" className="font-medium text-gray-700">
                            マーケティングメール
                        </label>
                        <p className="text-gray-500">新機能やキャンペーン情報を受け取る</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
