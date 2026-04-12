"use client"
import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string | number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    router.push(`?${params.toString()}`);
  };

  return {
    searchParams,
    updateParams,
  };
};