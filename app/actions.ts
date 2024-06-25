"use server"

import { z } from "zod"
import { invoiceSchema } from "./schema"
import { InvoiceWithRelations, createInvoice, deleteInvoice } from "@/lib/data"
import { v4 as uuid } from "uuid"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { generateRandomId } from "@/lib/utils"

export async function createInvoiceAction(data: z.infer<typeof invoiceSchema>) {
  const validatedFields = invoiceSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.format(),
      message: "Missing Fields. Failed to Create Invoice.",
    }
  }

  const senderAddressId = uuid()
  const clientAddressId = uuid()
  const invoiceId = generateRandomId()

  const invoiceData: InvoiceWithRelations = {
    ...validatedFields.data,
    id: invoiceId,
    paymentDue: new Date(validatedFields.data.invoiceDate),
    invoiceDate: new Date(validatedFields.data.invoiceDate),
    paymentTerms: parseInt(validatedFields.data.paymentTerms),
    status: "pending",
    total: validatedFields.data.items?.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0,
    ),
    createdAt: new Date(),
    updatedAt: new Date(),
    senderAddress: {
      ...validatedFields.data.senderAddress,
      id: senderAddressId,
    },
    clientAddress: {
      ...validatedFields.data.clientAddress,
      id: clientAddressId,
    },
    senderAddressId: senderAddressId,
    clientAddressId: clientAddressId,
    items: validatedFields.data.items.map((item) => ({
      id: uuid(),
      invoiceId: invoiceId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
  }

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
