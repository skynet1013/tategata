'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('メールアドレスまたはパスワードが正しくありません。');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            setError('エラーが発生しました。もう一度お試しください。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    ログイン
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    または{' '}
                    <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        新しいアカウントを作成
                    </Link>
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                            </div>
                        </div>
                    </div>
                )}
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            メールアドレス
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="relative block w-full rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="メールアドレス"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            パスワード
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="relative block w-full rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="パスワード"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            ログイン状態を保持
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            パスワードをお忘れですか？
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'ログイン中...' : 'ログイン'}
                    </button>
                </div>
            </form>
        </div>
    );
}
