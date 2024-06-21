import { Address, Invoice, Item } from "@prisma/client"
import prisma from "./db"
import { unstable_noStore as noStore } from "next/cache"

export type InvoiceWithRelations = Invoice & {
  senderAddress: Address
  clientAddress: Address
  items: Item[]
}

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
      take: 20,
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

// get invoce by id with sender address and client address and items
export async function fetchInvoiceById(id: string) {
  noStore()
  //await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        senderAddress: true,
        clientAddress: true,
        items: true,
      },
    })

    return invoice
  } catch (error) {
    console.error("Error retrieving invoice by id:", error)
    throw new Error("Error retrieving invoice by id")
  }
}

export async function createInvoice(data: InvoiceWithRelations) {
  //await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const newInvoice = await prisma.invoice.create({
      data: {
        id: data.id,
        paymentDue: new Date(data.invoiceDate),
        description: data.description,
        paymentTerms: data.paymentTerms,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        status: "pending", // or get the status from the form data if applicable
        total: 0, // You may need to calculate this based on items
        senderAddress: {
          create: {
            street: data.senderAddress.street,
            city: data.senderAddress.city,
            postCode: data.senderAddress.postCode,
            country: data.senderAddress.country,
          },
        },
        clientAddress: {
          create: {
            street: data.clientAddress.street,
            city: data.clientAddress.city,
            postCode: data.clientAddress.postCode,
            country: data.clientAddress.country,
          },
        },
        items: {
          create: data.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
          })),
        },
      },
    })
  } catch (error) {
    console.error("Error creating invoice:", error)
    return {
      message: "Database Error: Failed to Create Invoice.",
    }
  }
}
