import { Invoice } from "@prisma/client"
import prisma from "./db"
import { unstable_noStore as noStore } from "next/cache"

export async function fetchLatestInvoices(
  status?: string[],
): Promise<Invoice[]> {
  noStore()
  //await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        status: {
          in: status && status.length > 0 ? status : undefined,
        },
      },
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
  //await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const count = await prisma.invoice.count()
    return count
  } catch (error) {
    console.error("Error retrieving invoice count:", error)
    throw new Error("Error retrieving invoice count")
  }
}

export async function fetchInvoiceById(id: string): Promise<Invoice> {
  noStore()
  //await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
    })

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    return invoice
  } catch (error) {
    console.error("Error retrieving invoice by id:", error)
    throw new Error("Error retrieving invoice by id")
  }
}
