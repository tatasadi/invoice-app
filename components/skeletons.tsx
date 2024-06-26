import { Skeleton } from "@/components/ui/skeleton"
import { ITEMS_PER_PAGE } from "@/lib/data"

export function InvoiceListItemSkeleton() {
  return (
    <div className="grid grid-cols-2 place-items-start gap-2 p-6 sm:grid-cols-[repeat(5,1fr)_10px] sm:place-items-center sm:gap-6">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[80px]" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
  )
}

export function InvoiceTableSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <InvoiceListItemSkeleton key={index} />
      ))}
    </div>
  )
}

export function TotalInvoicesSkeleton() {
  return (
    <div className="flex items-center">
      <Skeleton className="h-4 w-40" />
    </div>
  )
}
