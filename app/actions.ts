"use server"

import { z } from "zod"
import { invoiceSchema } from "./schema"
import {
  InvoiceWithRelations,
  createInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoiceStatus,
} from "@/lib/data"
import { v4 as uuid } from "uuid"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { generateRandomId } from "@/lib/utils"

function createInvoiceWithRelationFromSchema(
  invoiceData: z.infer<typeof invoiceSchema>,
  oldInvoice?: InvoiceWithRelations,
): InvoiceWithRelations {
  const senderAddressId = oldInvoice ? oldInvoice.senderAddress.id : uuid()
  const clientAddressId = oldInvoice ? oldInvoice.clientAddress.id : uuid()
  const invoiceId = oldInvoice ? oldInvoice.id : generateRandomId()

  return {
    ...invoiceData,
    id: invoiceId,
    paymentDue: invoiceData.invoiceDate
      ? new Date(invoiceData.invoiceDate)
      : null,
    invoiceDate: invoiceData.invoiceDate
      ? new Date(invoiceData.invoiceDate)
      : new Date(),
    paymentTerms: invoiceData.paymentTerms
      ? parseInt(invoiceData.paymentTerms)
      : 0,
    status: "pending",
    total: invoiceData.items?.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0,
    ),
    createdAt: oldInvoice ? oldInvoice.createdAt : new Date(),
    updatedAt: new Date(),
    senderAddress: {
      ...invoiceData.senderAddress,
      id: senderAddressId,
    },
    clientAddress: {
      ...invoiceData.clientAddress,
      id: clientAddressId,
    },
    senderAddressId: senderAddressId,
    clientAddressId: clientAddressId,
    items: invoiceData.items.map((item) => ({
      id: uuid(),
      invoiceId: invoiceId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
  }
}

export async function createInvoiceAction(data: z.infer<typeof invoiceSchema>) {
  const validatedFields = invoiceSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.format(),
      message: "Missing Fields. Failed to Create Invoice.",
    }
  }

  const invoiceData = createInvoiceWithRelationFromSchema(validatedFields.data)

  await createInvoice(invoiceData)

  revalidatePath("/")
}

export async function createDraftInvoiceAction(
  data: z.infer<typeof invoiceSchema>,
) {
  const invoiceData = createInvoiceWithRelationFromSchema(data)
  invoiceData.status = "draft"

  await createInvoice(invoiceData)

  revalidatePath("/")
}

export async function deleteInvoiceAction(id: string) {
  await deleteInvoice(id)

  revalidatePath("/")
  redirect("/")
}

export async function updateInvoiceAction(
  invoice: InvoiceWithRelations,
  data: z.infer<typeof invoiceSchema>,
) {
  const validatedFields = invoiceSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.format(),
      message: "Missing Fields. Failed to Update Invoice.",
    }
  }
  const invoiceData = createInvoiceWithRelationFromSchema(data, invoice)

  await updateInvoice(invoiceData)

  revalidatePath("/")
}

export async function markInvoiceAsPaidAction(id: string) {
  await updateInvoiceStatus(id, "paid")

  revalidatePath("/")
}
