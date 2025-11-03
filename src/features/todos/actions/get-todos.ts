'use server';

import { apiClient, ApiError } from '@/shared/lib/api-client';
import { getAuthToken } from '@/shared/lib/auth';
import type { Todo } from '@/features/todos/types';

interface GetTodosParams { skip?: number; limit?: number; search?: string; completed?: boolean; }

export async function getTodosAction(params: GetTodosParams = {}) {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: { message: '認証が必要です' } };

    const qp = new URLSearchParams();
    if (params.skip !== undefined) qp.set('skip', String(params.skip));
    if (params.limit !== undefined) qp.set('limit', String(params.limit));
    if (params.search) qp.set('search', params.search);
    if (params.completed !== undefined) qp.set('completed', String(params.completed));
    const url = `/api/todos${qp.toString() ? `?${qp.toString()}` : ''}`;

    const todos = await apiClient<Todo[]>(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store', // ← apiClient が forward する前提
    });

    return { success: true, todos };
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Todoの取得に失敗しました';
    return { success: false, error: { message } };
  }
}
