'use client';

import { useState } from 'react';
import { Button, Input, Textarea } from '@/shared/components/atoms';
import { updateTodoAction, deleteTodoAction } from '@/features/todos/actions';
import type { Todo } from '@/features/todos/types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  // 完了/未完了の切り替え
  const handleToggleComplete = async () => {
    setIsUpdating(true);

    const result = await updateTodoAction(todo.id, {
      completed: !todo.completed,
    });

    if (result.success) {
      onUpdate();
    } else {
      alert(result.error?.message || '更新に失敗しました');
    }

    setIsUpdating(false);
  };

  // 編集を保存
  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    setIsUpdating(true);

    const result = await updateTodoAction(todo.id, {
      title: editTitle,
      description: editDescription || undefined,
    });

    if (result.success) {
      setIsEditing(false);
      onUpdate();
    } else {
      alert(result.error?.message || '更新に失敗しました');
    }

    setIsUpdating(false);
  };

  // 編集をキャンセル
  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  // 削除
  const handleDelete = async () => {
    if (!confirm('このTodoを削除しますか？')) {
      return;
    }

    setIsDeleting(true);

    const result = await deleteTodoAction(todo.id);

    if (result.success) {
      onUpdate();
    } else {
      alert(result.error?.message || '削除に失敗しました');
      setIsDeleting(false);
    }
  };

  // 編集モード
  if (isEditing) {
    return (
      <div className="p-4 bg-white border-2 border-primary-300 rounded-lg shadow-sm">
        <div className="space-y-3">
          {/* タイトル入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タイトル
            </label>
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="タイトル"
              autoFocus
            />
          </div>

          {/* 説明入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              説明
            </label>
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="説明（任意）"
              rows={3}
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              isLoading={isUpdating}
              className="flex-1 bg-cyan-500  w-[50%]"
            >
              保存
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 通常モード
  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      {/* チェックボックス */}
      <button
        onClick={handleToggleComplete}
        disabled={isUpdating}
        className="mt-1"
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
              className="w-5 h-5"
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

      {/* Todo内容（クリックで編集モード） */}
      <div
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
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
        className="bg-red-500 text-white"
      >
        削除
      </Button>
    </div>
  );
}