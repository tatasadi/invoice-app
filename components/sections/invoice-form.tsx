"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { DatePicker } from "@/components/ui/datepicker"
import InputWithLabel from "@/components/input-with-label"
import { DropdownSelect } from "@/components/ui/dropdown-select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
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
  paymentTerms: z.string({ required_error: "Please select a payment term" }),
  description: z.string(),
})

export default function InvoiceForm({
  className = "",
}: {
  className?: string
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      clientEmail: "",
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      invoiceDate: undefined,
      paymentTerms: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        className={cn("px-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section>
          <h2 className="text-purple-primary">Bill From</h2>
          <FormField
            control={form.control}
            name="senderAddress.street"
            render={({ field }) => (
              <InputWithLabel
                className="mt-6"
                id="senderAddress.street"
                type="text"
                label="Street Address"
                {...field}
              />
            )}
          />
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="senderAddress.city"
              render={({ field }) => (
                <InputWithLabel
                  id="senderAddress.city"
                  type="text"
                  label="City"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="senderAddress.postCode"
              render={({ field }) => (
                <InputWithLabel
                  id="senderAddress.postCode"
                  type="text"
                  label="Post Code"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="senderAddress.country"
              render={({ field }) => (
                <InputWithLabel
                  className="col-span-2 sm:col-span-1"
                  id="senderAddress.country"
                  type="text"
                  label="Country"
                  {...field}
                />
              )}
            />
          </div>
        </section>
        <section>
          <h2 className="mt-10 text-purple-primary sm:mt-12">Bill To</h2>
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <InputWithLabel
                className="mt-6"
                id="clientName"
                type="text"
                label="Client’s Name"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <InputWithLabel
                className="mt-6"
                id="clientEmail"
                type="email"
                label="Client’s Email"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="clientAddress.street"
            render={({ field }) => (
              <InputWithLabel
                className="mt-6"
                id="clientAddress.street"
                type="text"
                label="Street Address"
                {...field}
              />
            )}
          />

          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="clientAddress.city"
              render={({ field }) => (
                <InputWithLabel
                  id="clientAddress.city"
                  type="text"
                  label="City"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="clientAddress.postCode"
              render={({ field }) => (
                <InputWithLabel
                  id="clientAddress.postCode"
                  type="text"
                  label="Post Code"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="clientAddress.country"
              render={({ field }) => (
                <InputWithLabel
                  className="col-span-2 sm:col-span-1"
                  id="clientAddress.country"
                  type="text"
                  label="Country"
                  {...field}
                />
              )}
            />
          </div>
        </section>
        <section className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <DatePicker label="Issue Date" {...field} />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Terms</FormLabel>
                  <DropdownSelect
                    options={[
                      { value: "net1", label: "Net 1 Day" },
                      { value: "net7", label: "Net 7 Days" },
                      { value: "net14", label: "Net 14 Days" },
                      { value: "net30", label: "Net 30 Days" },
                    ]}
                    onSelect={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <InputWithLabel
                id="description"
                type="text"
                label="Project Description"
                className="sm:col-span-2"
                {...field}
              />
            )}
          />
        </section>
        <Button className="mt-10" variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
