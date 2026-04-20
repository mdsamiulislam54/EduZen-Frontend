"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import CreateSubjectForm from "../Form/CreateSubjectForm"
import CreateBatchForm from "../Form/CreateBatchForm"


const CreateBatchButton = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Create Batch
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="!max-w-3xl !overflow-y-scroll !min-h-screen ">
                    <DialogHeader>
                        <DialogTitle>Create Batch</DialogTitle>
                    </DialogHeader>

                    <CreateBatchForm onClose={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateBatchButton