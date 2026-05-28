"use client";

import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { adminChartData } from "@/app/(dashboardLayout)/dashboard/admin/_actions";
import Loader from "@/components/modules/Loader/loader";


const AdminChart = () => {
  const { data: chartData, isLoading, isError } = useQuery({
    queryKey: ["adminChartData"],
    queryFn: async () => await adminChartData(),
  });


  if (isLoading) {
    return <Loader length={1} />;
  }

  if (isError) {
    return (
      <div className="h-75 flex items-center justify-center text-red-500 text-sm">
        Failed to load chart data
      </div>
    );
  }

  if (!chartData?.length) {
    return (
      <div className="h-75 flex items-center justify-center text-muted-foreground text-sm">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-87.5 rounded-2xl border bg-card p-4 shadow-sm">
      <h2 className="text-base font-semibold mb-4">Admin Activity</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="currentColor"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminChart;