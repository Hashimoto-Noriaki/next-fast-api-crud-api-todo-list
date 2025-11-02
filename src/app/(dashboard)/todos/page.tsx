import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/shared/lib/auth';
import { getTodosAction } from '@/features/todos/actions';
import { ROUTES } from '@/shared/lib/constants';
import { LogoutButton } from '@/features/auth/components';
import { TodoList, TodoCreateForm } from '@/features/todos/components';

export default async function TodosPage() {
  // 認証チェック
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  // Todo一覧を取得（サーバー側）
  const result = await getTodosAction();

  const todos = result.success && result.todos ? result.todos : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* タイトル */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            マイTodo
          </h2>
          <p className="text-gray-600">
            {todos.length}件のTodo
          </p>
        </div>

        {/* Todo作成フォーム */}
        <TodoCreateForm />
        {/* Todo一覧 */}
        <TodoList todos={todos} />
      </main>
    </div>
  );
}
