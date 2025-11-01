'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Checkbox } from '@/shared/components/atoms';
import { FormField } from '@/shared/components/molecules';
import { useAuthForm } from '@/features/auth/hooks';
import { loginSchema, type LoginInput } from '@/features/auth/schemas';
import { ROUTES, APP_NAME } from '@/shared/lib/constants';

export default function LoginPage() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm(loginSchema);

  const onSubmit = async (data: LoginInput) => {
    try {
      setServerError('');

      // TODO: PR #4 で Server Action を実装
      console.log('Login data:', { ...data, rememberMe });

      // 仮の成功処理（2秒後にTodoページへ遷移）
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 成功時の処理
      alert('ログインに成功しました！');
      router.push(ROUTES.TODOS);
    } catch (error) {
      setServerError(
        'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
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
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ログイン
            </h2>
            <p className="text-gray-600">
              アカウントにログインしてください
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
              autoComplete="current-password"
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <Checkbox
                id="remember"
                label="ログイン状態を保持する"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link
                href="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                パスワードを忘れた方
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              ログイン
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <Link
                href={ROUTES.REGISTER}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                アカウントをお持ちでない方は{' '} 新規登録
              </Link>
            </p>
          </div>

          {/* Development Only */}
          {/* <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-yellow-800 font-medium mb-2">
              🔧 開発モード - テスト用データ
            </p>
            <p className="text-xs text-yellow-700">Email: test@example.com</p>
            <p className="text-xs text-yellow-700">Password: Password123</p>
          </div> */}
        </div>
      </main>
    </div>
  );
}
