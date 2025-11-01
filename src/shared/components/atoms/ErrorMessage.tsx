import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ message, className, ...props }, ref) => {
    if (!message) return null;

    return (
      <p
        ref={ref}
        className={cn("text-sm text-error-600 mt-1", className)}
        {...props}
      >
        {message}
      </p>
    );
  }
);

ErrorMessage.displayName = "ErrorMessage";
