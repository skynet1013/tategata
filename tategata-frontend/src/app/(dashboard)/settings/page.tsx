import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';

export default function SettingsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">設定</h1>
                <p className="mt-2 text-sm text-gray-500">
                    プロフィール、アカウントセキュリティ、通知設定を管理します。
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <ProfileSettings />
                    <AccountSettings />
                </div>
                <div>
                    <NotificationSettings />
                </div>
            </div>
        </div>
    );
}
