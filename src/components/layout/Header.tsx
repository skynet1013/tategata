import { Bell, User } from 'lucide-react';

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
            <div className="flex items-center">
                {/* Placeholder for breadcrumbs or page title */}
                <h2 className="text-lg font-semibold text-gray-800">ダッシュボード</h2>
            </div>
            <div className="flex items-center space-x-4">
                <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <Bell className="h-6 w-6" />
                </button>
                <div className="relative">
                    <button className="flex items-center rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-700">
                        <User className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
