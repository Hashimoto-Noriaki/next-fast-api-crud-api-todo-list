'use server';

import { apiClient, ApiError } from '@/shared/lib/api-client';
import { getAuthToken } from '@/shared/lib/auth';
import type { Todo } from '@/features/todos/types';

interface GetTodosParams {
  skip?: number;
  limit?: number;
  search?: string;
  completed?: boolean;
}

export async function getTodosAction(params: GetTodosParams = {}) {
  try {
    // 認証トークン取得
    const token = await getAuthToken();

    if (!token) {
      return {
        success: false,
        error: { message: '認証が必要です' },
      };
    }

    // クエリパラメータ構築
    const queryParams = new URLSearchParams();
    if (params.skip !== undefined) queryParams.set('skip', params.skip.toString());
    if (params.limit !== undefined) queryParams.set('limit', params.limit.toString());
    if (params.search) queryParams.set('search', params.search);
    if (params.completed !== undefined) queryParams.set('completed', params.completed.toString());

    const queryString = queryParams.toString();
    const url = `/api/todos${queryString ? `?${queryString}` : ''}`;

    // FastAPI にリクエスト
    const todos = await apiClient<Todo[]>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, todos };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: { message: error.message },
      };
    }

    return {
      success: false,
      error: { message: 'Todoの取得に失敗しました' },
    };
  }
}
