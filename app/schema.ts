import { z } from "zod"

const invoiceItemSchema = z.object({
  name: z.string().trim().min(1, { message: "Item name is required" }),
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number" }),
  // total: z.number().min(0, { message: "Total must be a positive number" }),
})

export const invoiceSchema = z.object({
  senderAddress: z.object({
    street: z.string().trim().min(1, { message: "Street is required" }),
    city: z.string().trim().min(1, { message: "City is required" }),
    postCode: z.string().trim().min(1, { message: "Post code is required" }),
    country: z.string().trim().min(1, { message: "Country is required" }),
  }),
  clientName: z.string().min(1, { message: "Client's name is required" }),
  clientEmail: z
    .string()
    .min(1, { message: "Client's email is required" })
    .email(),
  clientAddress: z.object({
    street: z.string().trim().min(1, { message: "Street is required" }),
    city: z.string().trim().min(1, { message: "City is required" }),
    postCode: z.string().trim().min(1, { message: "Post code is required" }),
    country: z.string().trim().min(1, { message: "Country is required" }),
  }),
  invoiceDate: z.date({ required_error: "Issue date is required" }),
  paymentTerms: z.string().min(1, { message: "Please select a payment term" }),
  description: z.string(),
  items: z
    .array(invoiceItemSchema)
    .min(1, { message: "At least one item is required" }),
})
