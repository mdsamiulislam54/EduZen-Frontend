"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">

        <h1 className="text-7xl font-extrabold tracking-tight text-primary">
          404
        </h1>

  
        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>


        <p className="mt-2 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/">
            <Button className="rounded-xl flex items-center gap-2">
              <Home size={16} />
              Home
            </Button>
          </Link>

          <Button
            variant="outline"
            className="rounded-xl flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Error code: 404 • Resource not found
        </p>
      </div>
    </div>
  );
}