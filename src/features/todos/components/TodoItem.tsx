'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/atoms';
import { updateTodoAction, deleteTodoAction } from '@/features/todos/actions';
import type { Todo } from '@/features/todos/types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 完了/未完了の切り替え
  const handleToggleComplete = async () => {
    setIsUpdating(true);

    const result = await updateTodoAction(todo.id, {
      completed: !todo.completed,
    });

    if (result.success) {
      onUpdate(); // 親コンポーネントで再取得
    } else {
      alert(result.error?.message || '更新に失敗しました');
    }

    setIsUpdating(false);
  };

  // 削除
  const handleDelete = async () => {
    if (!confirm('このTodoを削除しますか？')) {
      return;
    }

    setIsDeleting(true);

    const result = await deleteTodoAction(todo.id);

    if (result.success) {
      onUpdate(); // 親コンポーネントで再取得
    } else {
      alert(result.error?.message || '削除に失敗しました');
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      {/* チェックボックス */}
      <button
        onClick={handleToggleComplete}
        disabled={isUpdating}
        className="mt-1 flex-shrink-0"
      >
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-primary-600 border-primary-600'
              : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          {todo.completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </button>

      {/* Todo内容 */}
      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-medium ${
            todo.completed
              ? 'text-gray-400 line-through'
              : 'text-gray-900'
          }`}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p
            className={`mt-1 text-sm ${
              todo.completed ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {todo.description}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          {new Date(todo.created_at).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* 削除ボタン */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        isLoading={isDeleting}
        className="flex-shrink-0 text-error-600 hover:text-error-700 hover:bg-error-50"
      >
        削除
      </Button>
    </div>
  );
}
