import { Skeleton } from "@/components/ui/skeleton"

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
      {Array.from({ length: 10 }).map((_, index) => (
        <InvoiceListItemSkeleton key={index} />
      ))}
    </div>
  )
}
