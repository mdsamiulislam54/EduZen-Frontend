"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import { getOwnerDashboardChartData } from "@/app/(dashboardLayout)/dashboard/owner/_actions";

export default function ChartData() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["ownerDashboardChartData"],
    queryFn: getOwnerDashboardChartData,
  });

  const data = chartData?.data || [];

  if (isLoading) {
    return (
      <div className="h-80 w-full rounded-xl border bg-background flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-80 w-full rounded-xl border bg-background p-4 mt-10">
      <h2 className="text-lg font-semibold mb-4">
       Student Growth & Revenue Over Time
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          {/* X AXIS = DATE */}
          <XAxis
            dataKey="date"
            stroke="currentColor"
          />

          {/* Y AXIS = NUMERIC SCALE */}
          <YAxis stroke="currentColor" />

          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />

          <Legend />

          {/* LINE 1 */}
          <Line
            type="monotone"
            dataKey="totalFee"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

          {/* LINE 2 */}
          <Line
            type="monotone"
            dataKey="count"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}