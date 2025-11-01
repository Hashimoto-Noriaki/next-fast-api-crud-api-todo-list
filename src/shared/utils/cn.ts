import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwindクラスを安全にマージする
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
