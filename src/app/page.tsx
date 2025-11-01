import Link from "next/link";
import { Button } from "@/shared/components/atoms";
import { ROUTES, APP_NAME } from "@/shared/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between max-w-6xl">
          <h1 className="text-2xl font-bold text-primary-600">{APP_NAME}</h1>
          <div className="flex gap-3">
            <Link href={ROUTES.LOGIN}>
              <Button variant="ghost" size="md">
                ログイン
              </Button>
            </Link>
            <Link href={ROUTES.REGISTER}>
              <Button variant="primary" size="md">
                新規登録
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 max-w-6xl">
        <section className="py-20 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            タスク管理をシンプルに
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            効率的なTodo管理で生産性を向上させましょう。
            <br />
            いつでも、どこでも、あなたのタスクを管理できます。
          </p>

          <div className="flex gap-4 justify-center">
            <Link href={ROUTES.REGISTER}>
              <Button variant="primary" size="lg">
                今すぐ始める
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                詳しく見る
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            主な機能
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                シンプルな操作
              </h4>
              <p className="text-gray-600">
                直感的なUIで簡単にタスクを作成・管理できます
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-success-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                リアルタイム同期
              </h4>
              <p className="text-gray-600">
                どのデバイスからでもアクセス可能で、常に最新の状態を保ちます
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                強力な検索機能
              </h4>
              <p className="text-gray-600">
                タスクを素早く見つけられる高速検索機能を搭載
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="bg-primary-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              今すぐ始めましょう
            </h3>
            <p className="text-primary-100 text-lg mb-8">
              無料でアカウントを作成して、効率的なタスク管理を体験してください
            </p>
            <Link href={ROUTES.REGISTER}>
              <Button variant="secondary" size="lg">
                無料で新規登録
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 {APP_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-primary-600 transition-colors">
                利用規約
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                プライバシーポリシー
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
