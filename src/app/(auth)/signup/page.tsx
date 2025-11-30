'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('パスワードが一致しません。');
            setLoading(false);
            return;
        }

        try {
            // 1. Register user
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || '登録中にエラーが発生しました。');
            }

            // 2. Sign in automatically
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                // Should not happen if registration was successful
                router.push('/login');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || 'エラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    アカウント作成
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    または{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        既存のアカウントでログイン
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
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="relative block w-full border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="パスワード"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="sr-only">
                            パスワード（確認）
                        </label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="relative block w-full rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="パスワード（確認）"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? '登録中...' : '登録する'}
                    </button>
                </div>
            </form>
        </div>
    );
}
