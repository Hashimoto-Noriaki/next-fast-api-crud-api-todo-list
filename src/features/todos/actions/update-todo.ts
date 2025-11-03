'use server';

import { revalidatePath } from 'next/cache';
import { apiClient, ApiError } from '@/shared/lib/api-client';
import { getAuthToken } from '@/shared/lib/auth';
import type { Todo, TodoUpdateInput } from '@/features/todos/types';

export async function updateTodoAction(id: number, data: TodoUpdateInput) {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: { message: '認証が必要です' } };

    const todo = await apiClient<Todo>(`/api/todos/${id}`, {
      method: 'PUT', // ← FastAPI側に合わせる（PUTならPUTのままでOK）
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    revalidatePath('/todos');                   // ★ 反映させる
    return { success: true, todo };
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Todoの更新に失敗しました';
    return { success: false, error: { message } };
  }
}
