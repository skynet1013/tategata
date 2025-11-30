import { Search } from 'lucide-react';

export function KeywordSearch() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">キーワード検索</h3>
            <div className="mt-4 flex gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        className="block w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                        placeholder="キーワードを入力 (例: コスメ, ダイエット)"
                        defaultValue="コスメ"
                    />
                </div>
                <button className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Search className="mr-2 h-4 w-4" />
                    分析する
                </button>
            </div>
        </div>
    );
}
