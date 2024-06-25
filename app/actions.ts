"use server"

import { z } from "zod"
import { invoiceSchema } from "./schema"
import { InvoiceWithRelations, createInvoice, deleteInvoice } from "@/lib/data"
import { v4 as uuid } from "uuid"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { generateRandomId } from "@/lib/utils"

function createInvoiceWithRelationFromSchema(
  invoiceData: z.infer<typeof invoiceSchema>,
): InvoiceWithRelations {
  const senderAddressId = uuid()
  const clientAddressId = uuid()
  const invoiceId = generateRandomId()

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
    createdAt: new Date(),
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

  //TODO try catch
  await createInvoice(invoiceData)

  revalidatePath("/")
  redirect("/")
}

export async function createDraftInvoiceAction(
  data: z.infer<typeof invoiceSchema>,
) {
  const invoiceData = createInvoiceWithRelationFromSchema(data)
  invoiceData.status = "draft"
  console.log(invoiceData)

  //TODO try catch
  await createInvoice(invoiceData)

  revalidatePath("/")
  redirect("/")
}

export async function deleteInvoiceAction(id: string) {
  //TODO try catch
  await deleteInvoice(id)

  revalidatePath("/")
  redirect("/")
}
