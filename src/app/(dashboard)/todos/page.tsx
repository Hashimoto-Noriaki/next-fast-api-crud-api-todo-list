'use client';

import { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LogoutButton } from '@/features/auth/components';
import { TodoList } from '@/features/todos/components';
import { getTodosAction } from '@/features/todos/actions';
import { Spinner } from '@/shared/components/atoms';
import { ROUTES } from '@/shared/lib/constants';
import type { Todo } from '@/features/todos/types';

interface User {
  id: number;
  email: string;
  name: string;
}

export default function TodosPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      // 1) 認証チェック（cookie 読み込み）
      const userCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('user='));

      if (!userCookie) {
        router.push(ROUTES.LOGIN);
        return;
      }

      const userData: User = JSON.parse(
        decodeURIComponent(userCookie.split('=')[1])
      );

      // 2) state 更新は同期でなく microtask / transition でスケジュール
      queueMicrotask(() => {
        if (!mounted) return;
        startTransition(() => setUser(userData));
      });

      // 3) Todo 取得
      try {
        queueMicrotask(() => {
          if (!mounted) return;
          startTransition(() => setIsLoading(true));
        });

        const result = await getTodosAction();

        if (!mounted) return;

        if (result.success && result.todos) {
          startTransition(() => setTodos(result.todos));
        } else if (result.error?.message === '認証が必要です') {
          router.push(ROUTES.LOGIN);
          return;
        } else {
          alert(result.error?.message || 'Todoの取得に失敗しました');
        }
      } finally {
        if (!mounted) return;
        startTransition(() => setIsLoading(false));
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">Todo App</h1>

            <div className="flex items-center gap-4">
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
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">マイTodo</h2>
          <p className="text-gray-600">{todos.length}件のTodo</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <TodoList
            todos={todos}
            onUpdate={async () => {
              // 再取得も microtask/transition で
              queueMicrotask(() => startTransition(() => setIsLoading(true)));
              const result = await getTodosAction();
              if (result.success && result.todos) {
                startTransition(() => setTodos(result.todos));
              }
              startTransition(() => setIsLoading(false));
            }}
          />
        )}
      </main>
    </div>
  );
}
