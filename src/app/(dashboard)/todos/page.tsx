import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/shared/lib/auth';
import { ROUTES } from '@/shared/lib/constants';
import { LogoutButton } from '@/features/auth/components';

export default async function TodosPage() {
  // 認証チェック
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">Todo App</h1>

            <div className="flex items-center gap-4">
              {/* ユーザー情報 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* ログアウトボタン */}
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex items-center justify-center p-4 py-20">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 ログイン成功！
          </h2>
          <p className="text-gray-600 mb-2">ようこそ、{user.name} さん</p>
          <p className="text-gray-500 text-sm mb-8">
            Todo一覧ページは Phase 6 で実装予定です
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>✅ 認証機能完成</p>
            <p>✅ ログイン・新規登録・ログアウト</p>
            <p>⏳ Todo CRUD機能（次のPhase）</p>
          </div>
        </div>
      </main>
    </div>
  );
}

