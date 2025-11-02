'use server';

import { cookies } from 'next/headers';
import { apiClient, ApiError } from '@/shared/lib/api-client';
import { type RegisterInput } from '@/features/auth/schemas';

interface RegisterResponse {
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

export async function registerAction(data: RegisterInput) {
  try {
    // confirmPasswordは送信しない
    const { confirmPassword, ...registerData } = data;

    // FastAPI に登録リクエスト
    const response = await apiClient<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
    });

    // トークンをCookieに保存
    const cookieStore = await cookies();
    cookieStore.set('auth_token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    cookieStore.set('user', JSON.stringify(response.user), {
      httpOnly: false,
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
        message: 'アカウントの作成に失敗しました。もう一度お試しください。',
      },
    };
  }
}
