"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import CreateNoticeForm from "../Form/CreateNoticeForm"


const CreateNoticeButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className={"cursor-pointer"} onClick={() => setOpen(true)}>
        Create Notice
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-4xl overflow-y-scroll ">
          <DialogHeader>
            <DialogTitle>Create Notice </DialogTitle>
          </DialogHeader>

          <CreateNoticeForm onClose={() => setOpen(false)} mode="create" />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateNoticeButton