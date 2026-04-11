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


const CreateSubjectButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create Subject
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Subject</DialogTitle>
          </DialogHeader>

          <CreateSubjectForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateSubjectButton