"use client"

import { getAllOwnersById } from "@/app/(dashboardLayout)/dashboard/admin/owners/_actions"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../Loader/loader"
import ErrorState from "../../Error/Error"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Mail, Key, Layers, MapPin, CalendarDays } from "lucide-react";
import Image from "next/image"
import { Button } from "@/components/ui/button"

const SingleOwnerProfileCard = ({ id }: { id: string }) => {
  const { data: owner, isPending, isError } = useQuery({
    queryKey: ['owner',],
    queryFn: async () => await getAllOwnersById(id),
    staleTime: 0,

  });

  if (isPending) return <Loader length={1} />
  if (isError) return <ErrorState message="Failed to load owner details." />
  const center = owner.coachingCenter;
  return (
   <div className="md:flex min-h-screen w-full space-y-5 md:space-y-0 md:space-x-6">
      {/* Left Sidebar */}
      <aside className="md:w-80  md:p-6 shadow-lg flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          {owner.image ? (
            <Image
              src={owner.image}
              alt={`${owner.name}'s profile picture`}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 font-bold text-3xl">
              {owner.name?.charAt(0) ?? "U"}
            </div>
          )}
        </div>
        <h1 className="mt-4 text-xl font-bold text-center">{owner.name}</h1>
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          <Badge variant={owner.status?.ACTIVE === "ACTIVE" ? "default" : "destructive"}>{owner.status?.ACTIVE}</Badge>
          {owner.role && <Badge variant="secondary">{owner.role}</Badge>}
        </div>

        <div className="mt-6 flex flex-col gap-2 w-full">
          <Button variant="outline" className="w-full">Edit Owner</Button>
          <Button variant="destructive" className="w-full">Delete Owner</Button>
          {owner.needPasswordChange && <Button variant="secondary" className="w-full">Reset Password</Button>}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:p-8 space-y-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold mb-4">Owner Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" /> {owner.email}</div>
              <div className="flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary" /> Email Verified: {owner.emailVerified ? "Yes" : "No"}</div>
              <div className="flex items-center gap-2"><Key className="w-5 h-5 text-primary" /> Password Change Required: {owner.needPasswordChange ? "Yes" : "No"}</div>
              <div className="flex items-center gap-2"><Layers className="w-5 h-5 text-primary" /> Has Subscription: {owner.hasSubscription ? "Yes" : "No"}</div>
              <div className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-primary" /> Joined: {new Date(owner.createdAt || "").toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>

        {center && (
          <Card>
            <CardContent>
              <h2 className="text-lg font-bold mb-4">Coaching Center</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" /> {center.email}</div>
                {center.phone && <div className="flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary" /> {center.phone}</div>}
                {center.address && <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> {center.address}</div>}
                {center.status && <Badge variant={center.status?.PENDING === "PENDING" ? "destructive" : 'default'}>{center.status.PENDING}</Badge>}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

export default SingleOwnerProfileCard