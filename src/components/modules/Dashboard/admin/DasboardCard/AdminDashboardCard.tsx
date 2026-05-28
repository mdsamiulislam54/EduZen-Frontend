"use client"
import { adminDashboardActionCards } from '@/app/(dashboardLayout)/dashboard/admin/_actions'
import ErrorState from '@/components/modules/Error/Error';
import Loader from '@/components/modules/Loader/loader';
import { Card } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query'
import {
  Users,
  DollarSign,
  BadgeCheck,
  Building2,
} from "lucide-react";

const AdminDashboardCard = () => {
  const { data: dashboardCard, isLoading, isError } = useQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async () => await adminDashboardActionCards(),
  });

  if (isLoading) return <Loader length={4} key={3}/>
  if (isError) return <ErrorState message="Failed to load dashboard data. Please try again later." />


  const cards = [
    {
      title: "Total Revenue",
      value: formatNumber(dashboardCard?.totalRevenue || 0),
      icon: <DollarSign size={30} className="text-yellow-500" />,
    },
    {
      title: "Total Owners",
      value: formatNumber(dashboardCard?.totalOwners || 0),
      icon: <Users size={30} className="text-blue-500" />,
    },
    {
      title: "Total Coaching Centers",
      value: formatNumber(dashboardCard?.totalCoachingCenter || 0),
      icon: <Building2 size={30} className="text-green-500" />,
    },

    {
      title: " Active Subscriptions",
      value: formatNumber(dashboardCard?.activeSubscription || 0),
      icon: <BadgeCheck size={30} className="text-purple-500" />,

    }
  ]


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card key={index} >
            <div className="flex items-center flex-col justify-center gap-5">
              {card.icon}
              <span className="ml-2 text-2xl font-semibold ">{card.value}</span>
              <span className="ml-2 text-sm text-gray-500">{card.title}</span>

            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboardCard