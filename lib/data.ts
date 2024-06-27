import { Address, Invoice, Item } from "@prisma/client"
import prisma from "./db"
import { unstable_noStore as noStore } from "next/cache"

export const ITEMS_PER_PAGE = 10

export type InvoiceWithRelations = Invoice & {
  senderAddress: Address
  clientAddress: Address
  items: Item[]
}

export async function fetchLatestInvoices(
  currentPage: number,
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
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
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

export async function fetchInvoicesPages(status: string[]): Promise<number> {
  noStore()
  //await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const count = await prisma.invoice.count({
      where: {
        status: {
          in: status && status.length > 0 ? status : undefined,
        },
      },
    })
    return Math.ceil(Number(count) / ITEMS_PER_PAGE)
  } catch (error) {
    console.error("Error retrieving invoice count:", error)
    throw new Error("Error retrieving invoice count")
  }
}

// get invoce by id with sender address and client address and items
export async function fetchInvoiceById(
  id: string,
): Promise<InvoiceWithRelations | null> {
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

    return invoice || null
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
        status: data.status,
        total: data.total,
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

export async function deleteInvoice(invoiceId: string) {
  try {
    // First, delete all related items
    await prisma.item.deleteMany({
      where: { invoiceId },
    })

    // Fetch the related addresses before deleting the invoice
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { senderAddress: true, clientAddress: true },
    })

    // Delete the invoice first to remove foreign key constraints
    await prisma.invoice.delete({
      where: { id: invoiceId },
    })

    if (invoice) {
      // Then delete the related addresses
      await prisma.address.delete({
        where: { id: invoice.senderAddressId },
      })

      await prisma.address.delete({
        where: { id: invoice.clientAddressId },
      })
    }
  } catch (error) {
    console.error("Error deleting invoice with relations:", error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function updateInvoice(data: InvoiceWithRelations) {
  console.log("data", data)
  try {
    // Update invoice with all its relations
    await prisma.invoice.update({
      where: { id: data.id },
      data: {
        paymentDue: new Date(data.invoiceDate),
        description: data.description,
        paymentTerms: data.paymentTerms,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        status: data.status,
        total: data.total,
        senderAddress: {
          update: {
            where: { id: data.senderAddress.id },
            data: {
              street: data.senderAddress.street,
              city: data.senderAddress.city,
              postCode: data.senderAddress.postCode,
              country: data.senderAddress.country,
            },
          },
        },
        clientAddress: {
          update: {
            where: { id: data.clientAddress.id },
            data: {
              street: data.clientAddress.street,
              city: data.clientAddress.city,
              postCode: data.clientAddress.postCode,
              country: data.clientAddress.country,
            },
          },
        },
        items: {
          deleteMany: {}, // Delete existing items
          create: data.items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: (item.quantity || 0) * (item.price || 0),
          })),
        },
      },
    })
    return {
      message: "Invoice updated successfully",
    }
  } catch (error) {
    console.error("Error updating invoice with relations:", error)
    return {
      message: "Database Error: Failed to Update Invoice.",
    }
  }
}

export async function updateInvoiceStatus(
  id: string,
  status: string,
): Promise<{ message: string }> {
  try {
    await prisma.invoice.update({
      where: { id },
      data: { status },
    })
    return { message: "Invoice status updated successfully" }
  } catch (error) {
    console.error("Error updating invoice status:", error)
    return { message: "Database Error: Failed to Update Invoice Status." }
  }
}
