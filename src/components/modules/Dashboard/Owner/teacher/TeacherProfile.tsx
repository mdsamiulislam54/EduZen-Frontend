"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    Briefcase,
    User,
    Building2,
    Globe,
} from "lucide-react"
import { ISingleTeacher } from "@/types/teacher.type"



type Props = {
    teacher: ISingleTeacher
}

export default function TeacherProfileFull({ teacher }: Props) {
    
    return (
        <div className="w-full space-y-6">

            {/* 🔥 BANNER */}
            <div className="relative h-52 md:h-64 w-full rounded-xl overflow-hidden gradient">

                <Image
                    src={teacher?.coachingCenter?.image || "/public/banner.jpg"}
                    alt="banner"
                    width={100}
                    height={100}

                    className="object-cover opacity-30"
                />


            </div>

            {/* 🔥 HEADER */}
            <div className="relative px-6">

                {/* Avatar */}
                <div className="absolute -top-16 left-6">
                    <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-white">

                        <Image
                            src={teacher.image || ""}
                            alt={teacher.name}
                            width={128}
                            height={128}
                            className="object-cover"
                        />


                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-end mt-4">
                    <Button variant="outline">Edit Profile</Button>
                </div>

                {/* Name + Status */}
                <div className="mt-16 space-y-1">
                    <h1 className="text-2xl font-bold">{teacher.name}</h1>

                    <p className="text-muted-foreground">{teacher.email}</p>

                    <div className="flex gap-2">
                        <Badge>{teacher.status}</Badge>
                        <Badge variant="outline">{teacher.gender || "N/A"}</Badge>
                        <Badge variant="secondary">Teacher</Badge>
                    </div>
                </div>
            </div>

            {/* 🔥 STATS */}
            <div className="grid grid-cols-3 gap-4 px-6">
                <div className="p-4 border rounded-md text-center">
                    <p className="text-lg font-bold">{teacher.teacherSubjects.length ?? 0}</p>
                    <p className="text-xs text-muted-foreground">Subjects</p>
                </div>

                <div className="p-4 border rounded-md text-center">
                    <p className="text-lg font-bold">{teacher.experience || 0}</p>
                    <p className="text-xs text-muted-foreground">Years Experience</p>
                </div>

                <div className="p-4 border rounded-md text-center">
                    <p className="text-lg font-bold">{teacher.batchTeachers.length ?? 0}</p>
                    <p className="text-xs text-muted-foreground">Batches</p>
                </div>
            </div>

            {/* 🔥 MAIN GRID */}
            <div className="grid md:grid-cols-3 gap-6 px-6">

                {/* LEFT INFO */}
                <Card className="md:col-span-1">
                    <CardContent className="p-4 space-y-4">

                        <h2 className="font-semibold flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Personal Info
                        </h2>

                        <div className="space-y-2 text-sm">

                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {teacher.email}
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {teacher.phone}
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {teacher.address || "N/A"}
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {teacher.dateOfBirth || "N/A"}
                            </div>

                        </div>

                    </CardContent>
                </Card>

                {/* RIGHT INFO */}
                <div className="md:col-span-2 space-y-4">

                    {/* EDUCATION */}
                    <Card>
                        <CardContent className="p-4">
                            <h2 className="font-semibold mb-2">Education</h2>
                            <p className="text-sm text-muted-foreground">
                                {teacher.education || "Not provided"}
                            </p>
                        </CardContent>
                    </Card>

                    {/* EXPERIENCE */}
                    <Card>
                        <CardContent className="p-4">
                            <h2 className="font-semibold mb-2 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                Experience
                            </h2>

                            <p className="text-sm">
                                {teacher.experience
                                    ? `${teacher.experience} Years Experience`
                                    : "No experience data"}
                            </p>
                        </CardContent>
                    </Card>

                    {/* SUBJECTS */}
                    <Card>
                        <CardContent className="p-4">
                            <h2 className="font-semibold mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Subjects
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {teacher.teacherSubjects.length > 0 ? (
                                    teacher.teacherSubjects.map((sub) => (
                                        <div key={sub.id}>
                                            <Badge key={sub.id} variant="secondary">
                                                {sub.id}
                                            </Badge>
                                        </div>

                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No subjects assigned
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* COACHING CENTER */}
                    <Card>
                        <CardContent className="p-4 space-y-2">

                            <h2 className="font-semibold flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Coaching Center
                            </h2>

                            <p className="text-sm font-medium">
                                {teacher.coachingCenter.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {teacher.coachingCenter.address}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {teacher.coachingCenter.city} - {teacher.coachingCenter.area}
                            </p>

                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}