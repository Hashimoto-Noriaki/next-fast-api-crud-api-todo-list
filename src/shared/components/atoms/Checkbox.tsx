import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          ref={ref}
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-primary-600",
            "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";