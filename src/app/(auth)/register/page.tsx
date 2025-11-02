// src/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/atoms';
import { FormField } from '@/shared/components/molecules';
import { useAuthForm } from '@/features/auth/hooks';
import { registerSchema, type RegisterInput } from '@/features/auth/schemas';
import { registerAction } from '@/features/auth/actions';
import { ROUTES, APP_NAME } from '@/shared/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm(registerSchema);

  const onSubmit = async (data: RegisterInput) => {
    setServerError('');

    // Server Action を呼び出し
    const result = await registerAction(data);

    if (result.success) {
      // 成功時: Todoページへリダイレクト
      router.push(ROUTES.TODOS);
      router.refresh();
    } else {
      // エラー時: エラーメッセージを表示
      setServerError(
        result.error?.message || 'アカウントの作成に失敗しました'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-5 max-w-6xl">
          <Link href={ROUTES.HOME}>
            <h1 className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              {APP_NAME}
            </h1>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              新規登録
            </h2>
            <p className="text-gray-600">
              アカウントを作成して始めましょう
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-md">
              <p className="text-sm text-error-600">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              label="名前"
              type="text"
              placeholder="山田 太郎"
              error={errors.name?.message}
              required
              autoComplete="name"
              {...register('name')}
            />

            <FormField
              label="メールアドレス"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              required
              autoComplete="email"
              {...register('email')}
            />

            <FormField
              label="パスワード"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              required
              helperText="8文字以上、大文字・小文字・数字を含む"
              autoComplete="new-password"
              {...register('password')}
            />

            <FormField
              label="パスワード（確認）"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              required
              autoComplete="new-password"
              {...register('confirmPassword')}
            />

            <div className="pt-2">
              <p className="text-xs text-gray-500">
                登録することで、
                <Link
                  href="#"
                  className="text-primary-600 hover:text-primary-700"
                >
                  利用規約
                </Link>
                および
                <Link
                  href="#"
                  className="text-primary-600 hover:text-primary-700"
                >
                  プライバシーポリシー
                </Link>
                に同意したものとみなされます。
              </p>
            </div>

            <Button
              type="submit"
              className="bg-amber-500"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              アカウントを作成
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              既にアカウントをお持ちの方は{' '}
              <Link
                href={ROUTES.LOGIN}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ログイン
              </Link>
            </p>
          </div>

          {/* Development Only */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-800 font-medium mb-2">
              💡 パスワード要件
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 8文字以上</li>
              <li>• 大文字を1文字以上</li>
              <li>• 小文字を1文字以上</li>
              <li>• 数字を1文字以上</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}