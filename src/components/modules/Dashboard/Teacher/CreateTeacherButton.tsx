"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreateTeacherForm from "../Owner/Form/CreateTeacherForm"



const CreateTeacherButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create Teacher
      </Button>

      <Dialog open={open}  onOpenChange={setOpen} >
        <DialogContent className="!max-w-3xl overflow-y-scroll ">
          <DialogHeader>
            <DialogTitle>Create Teacher</DialogTitle>
          </DialogHeader>

          <CreateTeacherForm onClose={()=>setOpen(!open)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateTeacherButton