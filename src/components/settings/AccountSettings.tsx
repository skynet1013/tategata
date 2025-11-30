import { Lock, Mail } from 'lucide-react';

export function AccountSettings() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
                <Lock className="mr-2 h-5 w-5 text-gray-400" />
                アカウントセキュリティ
            </h3>
            <div className="mt-6 space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        メールアドレス
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex flex-grow items-stretch focus-within:z-10">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-none rounded-l-md border border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
                                defaultValue="user@example.com"
                            />
                        </div>
                        <button className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            変更
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-900">パスワード変更</h4>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                                現在のパスワード
                            </label>
                            <input
                                type="password"
                                name="current-password"
                                id="current-password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                新しいパスワード
                            </label>
                            <input
                                type="password"
                                name="new-password"
                                id="new-password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                新しいパスワード（確認）
                            </label>
                            <input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            パスワードを更新
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
