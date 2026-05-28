"use client"

import { getStudentRollNumber, IStudentPaymentAction } from "@/app/(dashboardLayout)/dashboard/owner/student-payment/_actions"
import ErrorState from "@/components/modules/Error/Error"
import Loader from "@/components/modules/Loader/loader"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import StudentFeeCard from "./StudentFeeCard"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import StudentPaymentForm from "./StudentPaymentForm"
import { set } from "zod"

const StudentPayment = () => {
    const [studentRoll, setStudentRoll] = useState<string>("");
    const [open, setOpen] = useState(false);
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const studentRoll = formData.get("studentRoll") as string;
        setStudentRoll(studentRoll)

    }
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ["studentPayment", studentRoll],
        queryFn: () => getStudentRollNumber(studentRoll),
        enabled: !!studentRoll,


    });

    const totalAmount = data?.studentFees.reduce((sum, fee) => sum + fee.dueAmount, 0)


    console.log(studentRoll);
    return (
        <div className="space-y-5">
            <Card>
                <div>
                    <form onSubmit={handleSearch} className="flex max-md:flex-col max-md:gap-3 justify-between items-center px-4 ">
                        <Input
                            type="text"
                            className="md:w-3/12 w-12/12"
                            name="studentRoll"

                            placeholder="Enter Student Roll..."
                        />
                        <Button type="submit">
                            {isFetching ? "Searching..." : "Search"}
                        </Button>
                    </form>
                </div>
            </Card>

            {
                isFetching && <Loader length={3} />

            }
            {
                isError && <ErrorState message="Failed to fetch student payment data. Please try again." />
            }
            {
                data && isSuccess && <StudentFeeCard data={data} setOpen={setOpen} />
            }

            {
                open && data && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className={data.studentFees.length > 0 ? "!max-w-4xl" : "!max-w-md"}>
                            <DialogHeader className="space-y-2 flex justify-between items-center">
                                <DialogTitle>Payment Student Roll : {studentRoll}</DialogTitle>
                                <DialogTitle>Total Payable: ৳ <span className="font-bold">{totalAmount?.toLocaleString('en-BD')}</span></DialogTitle>
                            </DialogHeader>

                            <StudentPaymentForm data={data} onOpen={setOpen} />
                        </DialogContent>
                    </Dialog>
                )
            }


        </div>
    )
}

export default StudentPayment