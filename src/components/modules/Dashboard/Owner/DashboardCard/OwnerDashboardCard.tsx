"use client"

import { getOwnerDashboardData } from "@/app/(dashboardLayout)/dashboard/owner/_actions"
import ErrorState from "@/components/modules/Error/Error";
import Loader from "@/components/modules/Loader/loader";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Building, DollarSign, UserCircle2, } from "lucide-react";
import { User } from "lucide-react";

const OwnerDashboardCardPage = () => {
    const { data: dashboardCard, isPending, isError } = useQuery({
        queryKey: ['owner-dashboard-data'],
        queryFn: async () => await getOwnerDashboardData()
    });

    if (isPending) return <Loader length={4} />
    if (isError) return <ErrorState message="Failed to load dashboard data. Please try again later." />

    const cards = [
        {
            title: "Total Students",
            value: dashboardCard?.data?.totalStudents || 0,
            icon: <User size={30} color="pink" />
        },
        {
            title: "Total Batches",
            value: dashboardCard?.data?.totalBatches || 0,
            icon: <Building size={30} color="purple" />
        },
        {
            title: "Total Revenue",
            value: dashboardCard?.data?.totalRevenue || 0,
            icon: <DollarSign size={30} color="green" />
        },
        {
            title: "Total Teachers",
            value: dashboardCard?.data?.totalTeachers || 0,
            icon: <UserCircle2 size={30} color="blue" />
        },
        {
            title: "Total Subjects",
            value: dashboardCard?.data?.totalSubjects || 0,
            icon: <BookOpen size={30} color="orange" />
        }
    ]
    return (
        <div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cards.map((card, index) => (
                    <Card key={index} className="">
                        <div className="flex items-center flex-col gap-5">
                            {card.icon}
                            <p className="text-2xl font-bold  mt-2">{card.value}</p>
                            <h3 className="text-sm font-light text-gray-400 ">{card.title}</h3>


                        </div>

                    </Card>
                ))}
            </div>
        </div>
    )
}

export default OwnerDashboardCardPage