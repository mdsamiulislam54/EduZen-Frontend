"use client"

import { getTeacherDashboardCard } from "@/app/(dashboardLayout)/dashboard/teacher/_actions"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Building, User } from "lucide-react"

const DashboardCardPage = () => {
    const { data: card, isPending, isError } = useQuery({
        queryKey: ["teacher-dashboard-card"],
        queryFn: async () => await getTeacherDashboardCard()
    })

    const cards = [
        {
            title: "Total Students",
            total: card?.totalStudent ?? 0,
            icon: <User size={30} color="pink" />

        },
        {
            title: "Total Batch",
            total: card?.totalBatches ?? 0,
            icon: <Building size={30} color="purple" />

        },
        {
            title: "Total Subjects",
            total: card?.totalSubjects ?? 0,
            icon: <BookOpen size={30} color="orange" />

        }
    ]

    return (
        <div>
            <div className="grid md:grid-cols-3  gap-4">
                {cards.map((card, index) => (
                    <Card key={index} className="">
                        <div className="flex items-center flex-col gap-5">
                            {card.icon}
                            <p className="text-2xl font-bold  mt-2">{card.total}</p>
                            <h3 className="text-sm font-light text-gray-400 ">{card.title}</h3>
                        </div>

                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DashboardCardPage