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

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const result = await updateTodoAction(todo.id, { completed: !todo.completed });
      if (result.success) {
        onUpdate();
      } else {
        alert(result.error?.message || '更新に失敗しました');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('このTodoを削除しますか？')) return;

    setIsDeleting(true);
    try {
      const result = await deleteTodoAction(todo.id);
      if (result.success) {
        onUpdate();
      } else {
        alert(result.error?.message || '削除に失敗しました');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      <Button
        onClick={handleToggleComplete}
        disabled={isUpdating}
        className="mt-1 bg-emerald-500 text-white"
        aria-busy={isUpdating}
        aria-label={todo.completed ? '未完了にする' : '完了にする'}
      >
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-primary-600 border-primary-600'
              : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </Button>

      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>{todo.description}</p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          {new Date(todo.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        isLoading={isDeleting}
        disabled={isDeleting}
        className="bg-red-500 text-white mt-1"
      >
        削除
      </Button>
    </div>
  );
}
