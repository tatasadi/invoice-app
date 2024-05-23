import { Invoice } from "@prisma/client"
import prisma from "./db"
import { unstable_noStore as noStore } from "next/cache"

export async function fetchLatestInvoices(): Promise<Invoice[]> {
  noStore()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
    })

    const latestInvoices = invoices.map((invoice) => ({
      ...invoice,
    }))

    return latestInvoices
  } catch (error) {
    console.error("Error retrieving latest invoices:", error)
    throw new Error("Error retrieving latest invoices")
  }
}

export async function fetchInvoicesCount(): Promise<number> {
  noStore()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const count = await prisma.invoice.count()
    return count
  } catch (error) {
    console.error("Error retrieving invoice count:", error)
    throw new Error("Error retrieving invoice count")
  }
}
