'use server';

import { apiClient, ApiError } from '@/shared/lib/api-client';
import { getAuthToken } from '@/shared/lib/auth';

export async function deleteTodoAction(id: number) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return {
        success: false,
        error: { message: '認証が必要です' },
      };
    }

    await apiClient(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: { message: error.message },
      };
    }

    return {
      success: false,
      error: { message: 'Todoの削除に失敗しました' },
    };
  }
}
