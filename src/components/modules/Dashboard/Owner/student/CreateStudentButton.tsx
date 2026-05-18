"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreateStudentFormPage from "../Form/CreateStudentForm"

const CreateStudentButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create Student
      </Button>

      <Dialog open={open}  onOpenChange={setOpen} >
        <DialogContent className="!max-w-4xl overflow-y-scroll ">
      
          <CreateStudentFormPage onClose={()=>setOpen(!open)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateStudentButton