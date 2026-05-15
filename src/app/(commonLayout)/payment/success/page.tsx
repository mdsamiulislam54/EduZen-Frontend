"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      
      <Card className="w-full max-w-md rounded-2xl shadow-lg border">
        
        {/* HEADER */}
        <CardHeader className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold">Payment Successful</h1>

          <p className="text-sm text-muted-foreground">
            Your subscription has been activated successfully.
          </p>
        </CardHeader>

        {/* BODY */}
        <CardContent className="space-y-4">
          
          <div className="rounded-xl border bg-muted/20 p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-green-600">ACTIVE</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-medium">Completed</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Access</span>
              <span className="font-medium">Unlocked</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-2">
            
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

          </div>

          {/* SMALL NOTE */}
          <p className="text-xs text-center text-muted-foreground">
            If you face any issue, contact support.
          </p>

        </CardContent>
      </Card>

    </div>
  );
};

export default SuccessPage;