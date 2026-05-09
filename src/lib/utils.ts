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


export const toBdISOString = (value: string | Date | null|  undefined): string => {
  if (value === undefined || value === null) {
    return "";
  }
  const date = value instanceof Date ? value : new Date(value)

  // timezone offset remove
  const tzOffset = date.getTimezoneOffset() * 60000

  const localTime = new Date(date.getTime() - tzOffset).toISOString()

  return localTime
}


export const formatTime = (isoString?: string) => {
    if (!isoString) return "";

    const date = new Date(isoString);
    return date.toISOString().slice(11, 16); // HH:mm
};

 export const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    return new Date(isoString).toISOString().split("T")[0];
};


import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong!"
    );
  }

  throw error;
};