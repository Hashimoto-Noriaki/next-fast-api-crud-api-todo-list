//Zod バリデーションスキーマ
import { z } from 'zod';

export const todoCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください'),
  description: z
    .string()
    .max(500, '説明は500文字以内で入力してください')
    .optional(),
});

export const todoUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください')
    .optional(),
  description: z
    .string()
    .max(500, '説明は500文字以内で入力してください')
    .optional(),
  completed: z.boolean().optional(),
});

export type TodoCreateInput = z.infer<typeof todoCreateSchema>;
export type TodoUpdateInput = z.infer<typeof todoUpdateSchema>;
