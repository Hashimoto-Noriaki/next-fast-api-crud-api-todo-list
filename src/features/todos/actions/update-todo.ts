'use server';

import { apiClient, ApiError } from '@/shared/lib/api-client';
import { getAuthToken } from '@/shared/lib/auth';
import type { Todo, TodoUpdateInput } from '@/features/todos/types';

export async function updateTodoAction(id: number, data: TodoUpdateInput) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return {
        success: false,
        error: { message: '認証が必要です' },
      };
    }

    const todo = await apiClient<Todo>(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return { success: true, todo };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: { message: error.message },
      };
    }

    return {
      success: false,
      error: { message: 'Todoの更新に失敗しました' },
    };
  }
}
