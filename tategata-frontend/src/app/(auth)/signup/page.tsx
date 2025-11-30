import Link from 'next/link';

export default function SignupPage() {
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
            <form className="mt-8 space-y-6" action="#" method="POST">
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
                            className="relative block w-full rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="パスワード（確認）"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        登録する
                    </button>
                </div>
            </form>
        </div>
    );
}
