"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-lg border border-border shadow-2xl rounded-2xl">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>

                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-bold tracking-tight">
                            Something went wrong
                        </CardTitle>

                        <CardDescription className="text-base">
                            An unexpected error occurred while processing your request.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Error Message */}
                    <div className="rounded-xl border bg-muted/40 p-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                            Error Details
                        </p>

                        <p className="text-sm text-red-500 break-words">
                            {error?.message ||
                                "Unexpected application error occurred."}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={() => unstable_retry()}
                            className="flex-1 gap-2"
                        >
                            <RefreshCcw className="h-4 w-4" />
                            Try Again
                        </Button>

                        <Button
                            
                            variant="outline"
                            className="flex-1 gap-2"
                        >
                            <Link href="/">
                                <Home className="h-4 w-4" />
                                Go Home
                            </Link>
                        </Button>
                    </div>

                    {/* Support Text */}
                    <div className="text-center text-xs text-muted-foreground">
                        If the problem persists, please contact support or try
                        again later.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}