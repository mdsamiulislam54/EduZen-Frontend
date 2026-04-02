"use client";

import { getAllOwners } from "@/app/(dashboardLayout)/dashboard/admin/owners/_actions";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/loader";
import ErrorState from "../../Error/Error";
import { TOwner } from "@/types/owner.type";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

const OwnerProfileCard = () => {
    const { data: owners, isLoading, isError } = useQuery({
        queryKey: ["owners"],
        queryFn: async () => await getAllOwners(),
    });

    if (isLoading) return <Loader />;
    if (isError) return <ErrorState message="Failed to load owners." />;

    return (
        <div className="grid gap-6 sm:grid-cols-2  lg:grid-cols-3">
            {owners?.map((owner: TOwner) => (
                <Card
                    key={owner.id}
                    className="group  relative overflow-hidden border bg-background/60 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl"
                >
                    {/* Status Dot */}
                    <span
                        className={`absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse ${owner?.status?.ACTIVE === owner?.status?.ACTIVE
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                    />

                    <CardHeader className="flex flex-col items-center text-center pb-2">
                        <Image
                            src={
                                owner.image ||
                                "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                            }
                            alt={owner.name || "Owner"}
                            width={120}
                            height={120}
                            className="rounded-full border-4 border-muted shadow-md group-hover:scale-105 transition"
                        />

                        <h2 className="mt-3 text-lg font-semibold">
                            {owner.name || "Unknown"}
                        </h2>

                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail size={14} /> {owner.email}
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-3 text-sm">
                        {/* Role */}
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Role</span>
                            <Badge variant="secondary" className="capitalize">
                                {owner.role || "N/A"}
                            </Badge>
                        </div>

                        {/* Email Verified */}
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Verified</span>
                            <Badge
                                variant={owner.emailVerified ? "default" : "destructive"}
                            >
                                {owner.emailVerified ? "Yes" : "No"}
                            </Badge>
                        </div>

                        {/* Subscription */}
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Subscription</span>
                            <Badge
                                variant={owner.hasSubscription ? "default" : "outline"}
                            >
                                {owner.hasSubscription ? "Active" : "None"}
                            </Badge>
                        </div>


                        {/* Password Change */}
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Security</span>
                            <div className="flex items-center gap-1 text-xs">
                                <ShieldCheck size={14} />
                                {owner.needPasswordChange ? "Update Needed" : "OK"}
                            </div>
                        </div>

                        {/* Button */}
                        <Button className="w-full mt-3 rounded-xl">
                            <Link href={`/dashboard/admin/owners/${owner.id}`} >
                                View Details
                            </Link>
                        </Button>

                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default OwnerProfileCard;