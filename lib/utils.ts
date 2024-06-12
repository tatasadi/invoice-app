import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  })
}

export function formatDate(date: Date): string {
  return format(date, "dd MMM yyyy")
}
