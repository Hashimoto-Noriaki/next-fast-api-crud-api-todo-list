'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoCreateSchema, type TodoCreateInput } from '@/features/todos/schemas';

export function useTodoForm() {
  return useForm<TodoCreateInput>({
    resolver: zodResolver(todoCreateSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });
}
