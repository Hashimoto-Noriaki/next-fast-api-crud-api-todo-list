'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/atoms';
import { FormField } from '@/shared/components/molecules';
import { useTodoForm } from '@/features/todos/hooks';
import { createTodoAction } from '@/features/todos/actions';
import type { TodoCreateInput } from '@/features/todos/schemas';

export function TodoCreateForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useTodoForm();

  const onSubmit = async (data: TodoCreateInput) => {
    setServerError('');

    // Server Action を呼び出し
    const result = await createTodoAction(data);

    if (result.success) {
      reset(); // フォームをリセット
      setIsOpen(false); // フォームを閉じる
      router.refresh(); // Server Component を再実行してTodo一覧を更新
    } else {
      setServerError(result.error?.message || 'Todoの作成に失敗しました');
    }
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto"
        >
          + 新しいTodoを作成
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          新しいTodo
        </h3>
        {/* <Button
          onClick={() => {
            setIsOpen(false);
            reset();
            setServerError('');
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
        </Button> */}
      </div>

      {/* Server Error */}
      {/* {serverError && (
        <div className="mb-4 p-4 bg-error-50 border border-error-200 rounded-md">
          <p className="text-sm text-error-600">{serverError}</p>
        </div>
      )} */}

      {/* フォーム */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="タイトル"
          type="text"
          placeholder="例: 買い物に行く"
          error={errors.title?.message}
          required
          {...register('title')}
        />

        <FormField
          label="説明"
          type="textarea"
          placeholder="詳細な説明（任意）"
          error={errors.description?.message}
          rows={3}
          {...register('description')}
        />

        <div className="flex gap-5 pt-2">
          <Button
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-white"
          >
            作成
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => {
              setIsOpen(false);
              reset();
              setServerError('');
            }}
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  );
}
