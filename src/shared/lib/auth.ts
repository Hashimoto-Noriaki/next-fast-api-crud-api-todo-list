import { cookies } from 'next/headers';

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

/**
 * サーバー側で現在のユーザーを取得
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return null;
    }

    return JSON.parse(userCookie.value) as User;
  } catch (error) {
    return null;
  }
}

/**
 * サーバー側で認証トークンを取得
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('auth_token');

    return tokenCookie?.value || null;
  } catch (error) {
    return null;
  }
}

/**
 * 認証チェック
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}
