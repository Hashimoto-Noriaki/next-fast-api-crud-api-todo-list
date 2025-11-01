'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

/**
 * 認証フォーム用のカスタムフック
 * Zodスキーマとreact-hook-formを統合
 * 
 * @param schema - Zodバリデーションスキーマ
 * @returns react-hook-formのフォームメソッド
 * 
 * @example
 * const form = useAuthForm(loginSchema);
 */
export function useAuthForm<TSchema extends z.ZodType>(schema: TSchema) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
}
