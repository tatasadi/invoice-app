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
import { createInvoiceAction } from "@/app/actions"
import { invoiceSchema } from "@/app/schema"
import { useState, useTransition } from "react"
import { start } from "repl"

// type FormErrors = {
//   senderAddress?: string[] | undefined
//   clientName?: string[] | undefined
//   clientEmail?: string[] | undefined
//   clientAddress?: string[] | undefined
//   invoiceDate?: string[] | undefined
//   paymentTerms?: string[] | undefined
//   description?: string[] | undefined
// }

type FormErrors = z.inferFormattedError<typeof invoiceSchema>

export default function InvoiceForm({
  className = "",
}: {
  className?: string
}) {
  const [pending, startTransition] = useTransition()
  const [formErrors, setFormErrors] = useState<FormErrors>({} as FormErrors)

  console.log("formErrors", formErrors)

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
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

  async function onSubmit(data: z.infer<typeof invoiceSchema>) {
    startTransition(async () => {
      const result = await createInvoiceAction(data)
      if (result?.errors) {
        setFormErrors(result.errors)
      } else {
        setFormErrors({} as FormErrors)
      }
    })
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
                error={formErrors.senderAddress?.street?._errors}
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
          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => <DatePicker label="Issue Date" {...field} />}
          />
          <FormField
            control={form.control}
            name="paymentTerms"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Payment Terms</FormLabel>
                <DropdownSelect
                  options={[
                    { value: "1", label: "Net 1 Day" },
                    { value: "7", label: "Net 7 Days" },
                    { value: "14", label: "Net 14 Days" },
                    { value: "30", label: "Net 30 Days" },
                  ]}
                  onSelect={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
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

        {/* {formErrors && (
          <div className="mt-6 text-red-500">
            {Object.values(formErrors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )} */}
        {/* {formErrors && (
          <p className="mt-6">
            {Object.values(formErrors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </p>
        )} */}

        <Button
          className="mt-10"
          variant="primary"
          type="submit"
          disabled={pending}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
