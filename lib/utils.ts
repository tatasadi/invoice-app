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

export function generateRandomId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const randomLetters =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length))
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString() // Ensures a 4-digit number

  return randomLetters + randomDigits
}
