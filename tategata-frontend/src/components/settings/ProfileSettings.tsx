import { User, Camera } from 'lucide-react';

export function ProfileSettings() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
                <User className="mr-2 h-5 w-5 text-gray-400" />
                プロフィール設定
            </h3>
            <div className="mt-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">プロフィール画像</label>
                    <div className="mt-2 flex items-center space-x-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-100">
                            <User className="h-full w-full p-4 text-gray-300" />
                        </div>
                        <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                            <Camera className="mr-2 h-4 w-4 text-gray-500" />
                            画像を変更
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="display-name" className="block text-sm font-medium text-gray-700">
                        表示名
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="display-name"
                            id="display-name"
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            defaultValue="Tategata User"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        自己紹介
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            placeholder="自己紹介を入力してください"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        保存する
                    </button>
                </div>
            </div>
        </div>
    );
}
