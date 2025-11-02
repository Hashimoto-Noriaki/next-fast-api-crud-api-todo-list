'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiClient, ApiError } from '@/shared/lib/api-client';
import { type LoginInput } from '@/features/auth/schemas';
import { ROUTES } from '@/shared/lib/constants';

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export async function loginAction(data: LoginInput) {
  try {
    // FastAPI にログインリクエスト
    const response = await apiClient<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // トークンをCookieに保存
    const cookieStore = await cookies();
    cookieStore.set('auth_token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7日間
      path: '/',
    });

    // ユーザー情報もCookieに保存（オプション）
    cookieStore.set('user', JSON.stringify(response.user), {
      httpOnly: false, // クライアント側で読める
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true, user: response.user };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.status.toString(),
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'ログインに失敗しました。もう一度お試しください。',
      },
    };
  }
}
