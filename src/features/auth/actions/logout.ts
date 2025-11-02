'use server';

import { cookies } from 'next/headers';

export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // Cookieを削除
    cookieStore.delete('auth_token');
    cookieStore.delete('user');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'ログアウトに失敗しました',
      },
    };
  }
}
