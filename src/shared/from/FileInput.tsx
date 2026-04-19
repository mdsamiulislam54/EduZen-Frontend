"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import Image from "next/image"

type Props = {
  label?: string
  value?: File | string | null
  accept?: string
  onChange: (file: File | null) => void
  error?: string
  preview?: boolean
}

const FileInput = ({
  label,
  accept = "image/*",
  onChange,
  error,
}: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3">
        <Input
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null
            onChange(file)
          }}
          className="cursor-pointer"
        />

      </div>

      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default FileInput