"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



const CreateExamButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create Exam
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Exam</DialogTitle>
          </DialogHeader>

          {/* <CreateSubjectForm onClose={() => setOpen(false)} /> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateExamButton