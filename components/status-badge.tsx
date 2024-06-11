import { cn } from "@/lib/utils"

export default function StatusBadge({
  status,
  className = "",
}: {
  status: string
  className?: string
}) {
  const statusClass = {
    paid: "bg-green-light/5 text-green-light",
    pending: "bg-orange-light/5 text-orange-light",
    draft:
      "bg-navy-muted/5 text-navy-muted dark:bg-blue-light/5 dark:text-blue-light",
  }
  return (
    <div
      className={cn(
        "flex w-fit items-center justify-center gap-2 rounded-md px-6 py-3",
        className,
        statusClass[status as keyof typeof statusClass],
      )}
    >
      <span className="h-2 w-2 rounded-full bg-current"></span>
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
  )
}
