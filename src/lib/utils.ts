import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const buildQueryString = (
  params: Record<string, string | string[] | undefined>
) => {
  return new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value === undefined || value === null || value === "") return acc;
      if (Array.isArray(value)) {
        acc[key] = value.join(",");
      } else {
        acc[key] = String(value);
      }

      return acc;
    }, {} as Record<string, string>)
  ).toString();
};