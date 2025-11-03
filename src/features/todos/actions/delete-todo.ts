'use server';

import { revalidatePath } from 'next/cache';
import { apiClient, ApiError } from '@/shared/lib/api-client';
import { getAuthToken } from '@/shared/lib/auth';

export async function deleteTodoAction(id: number) {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: { message: '認証が必要です' } };

    await apiClient(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    revalidatePath('/todos'); // ★ 反映させる
    return { success: true };
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Todoの削除に失敗しました';
    return { success: false, error: { message } };
  }
}
