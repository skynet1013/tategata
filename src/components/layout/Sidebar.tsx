import Link from 'next/link';
import { LayoutDashboard, Search, Users, TrendingUp, Settings, LogOut, Sparkles } from 'lucide-react';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
  { name: 'AI企画書作成', href: '/content-planning', icon: Sparkles },
  { name: 'キーワード分析', href: '/keyword-analysis', icon: Search },
  { name: 'アカウント分析', href: '/account-analysis', icon: Users },
  { name: 'トレンド分析', href: '/trend-analysis', icon: TrendingUp },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider">TATEGATA</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-800 p-4">
        <Link href="/settings" className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
          <Settings className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white" />
          設定
        </Link>
        <Link href="/logout" className="mt-1 group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
          <LogOut className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white" />
          ログアウト
        </Link>
      </div>
    </div>
  );
}
