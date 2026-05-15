"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">

     
        <div className="flex items-center justify-between">
          <div className="h-8 w-60 bg-muted rounded-lg" />
          <div className="h-8 w-24 bg-muted rounded-lg" />
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <Card key={item} className="rounded-2xl">
              <CardHeader>
                <div className="h-5 w-32 bg-muted rounded" />
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="h-4 w-4/6 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="h-5 w-40 bg-muted rounded" />
            </CardHeader>

            <CardContent className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-full bg-muted rounded" />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl md:col-span-2">
            <CardHeader>
              <div className="h-5 w-48 bg-muted rounded" />
            </CardHeader>

            <CardContent className="space-y-6">

            
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-muted rounded-xl" />
                ))}
              </div>

              <div className="flex justify-end">
                <div className="h-10 w-32 bg-muted rounded-lg" />
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}