import { Invoice } from "@prisma/client"
import prisma from "./db"
import { unstable_noStore as noStore } from "next/cache"

//await new Promise((resolve) => setTimeout(resolve, 3000))

export async function fetchLatestInvoices(): Promise<Invoice[]> {
  noStore()
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
