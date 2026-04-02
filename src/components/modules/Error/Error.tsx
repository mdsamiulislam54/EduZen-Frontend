"use client";

import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  message?: string;
};

export default function ErrorState({
  message = "Something went wrong."
}: ErrorStateProps) {
  return (
    <div className="text-red-500 flex justify-center items-center min-h-screen flex-col gap-5">
      <p>{message}</p>

     
        <Button onClick={()=> window.location.reload()} variant="outline"   >
          Retry
        </Button>
  
    </div>
  );
}