import { forwardRef, InputHTMLAttributes } from 'react';
import { Label, Input, ErrorMessage } from '@/shared/components/atoms';
import { cn } from '@/shared/utils/cn';

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  containerClassName?: string;
}

/**
 * Label + Input + ErrorMessage をまとめたフォームフィールド
 * react-hook-form との統合を簡単にする
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      required,
      helperText,
      containerClassName, // ← div用
      className,          // ← Input用
      id,
      ...props
    },
    ref
  ) => {
    // IDがない場合は自動生成（ラベルから）
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={cn('space-y-1', containerClassName)}>
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          error={error}
          className={className} // ← Input に className を渡す
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && <ErrorMessage id={`${inputId}-error`} message={error} />}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
