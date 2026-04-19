"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

type Props = {
  meta: {
    page: number,
    total: number,
    totalPages: number,
    limit: number
  }
}

export default function AppPagination({ meta }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = meta.page
  const totalPages = meta.totalPages

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    return `?${params.toString()}`
  }

  const goToPage = (page: number) => {
    router.push(createPageURL(page))
  }

  const getPages = () => {
    const pages: (number | "...")[] = []

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  const pages = getPages()

  return (
    <div className="flex items-center justify-between mt-4 flex-wrap gap-2">

      {/* Info */}
      <p className="text-sm text-muted-foreground">
        Showing page {meta.page} of {meta.totalPages} ({meta.total} items)
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-1">

        {/* Prev */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          {"<"}
        </Button>

        {/* Numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={i}
              size="sm"
              variant={currentPage === p ? "default" : "outline"}
              onClick={() => goToPage(p)}
              className="min-w-[36px]"
            >
              {p}
            </Button>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          {">"}
        </Button>

      </div>
    </div>
  )
}