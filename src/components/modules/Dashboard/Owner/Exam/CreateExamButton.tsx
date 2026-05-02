"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreateExamFormPage from "../Form/ExamCreateForm"



const CreateExamButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create Exam
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-3xl ">
          <DialogHeader>
            <DialogTitle>Create Exam</DialogTitle>
          </DialogHeader>

          <CreateExamFormPage onClose={()=> setOpen(!open)}/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateExamButton