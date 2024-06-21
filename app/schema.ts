import { z } from "zod"

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
})
