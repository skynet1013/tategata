import Link from 'next/link';

export default function LogoutPage() {
    return (
        <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                ログアウトしました
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                ご利用ありがとうございました。
            </p>
            <div className="mt-8">
                <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    ログイン画面に戻る
                </Link>
            </div>
        </div>
    );
}
