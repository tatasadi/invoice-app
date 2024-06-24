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
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { createInvoiceAction } from "@/app/actions"
import { invoiceSchema } from "@/app/schema"
import { useState, useTransition } from "react"
import { FaTrash } from "react-icons/fa"
import { useBreakpoint } from "@/lib/hooks/tailwind"

type FormErrors = z.inferFormattedError<typeof invoiceSchema>

export default function InvoiceForm({
  className = "",
}: {
  className?: string
}) {
  const [pending, startTransition] = useTransition()
  const [formErrors, setFormErrors] = useState<FormErrors>({} as FormErrors)
  const isTablet = useBreakpoint("sm")

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
      items: [{ name: "", quantity: 1, price: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const items = form.watch("items")

  async function onSubmit(data: z.infer<typeof invoiceSchema>) {
    console.log("data", data)
    // startTransition(async () => {
    //   const result = await createInvoiceAction(data)
    //   if (result?.errors) {
    //     setFormErrors(result.errors)
    //   } else {
    //     setFormErrors({} as FormErrors)
    //   }
    // })
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
                  error={formErrors.senderAddress?.city?._errors}
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
                  error={formErrors.senderAddress?.postCode?._errors}
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
                  error={formErrors.senderAddress?.country?._errors}
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
                error={formErrors.clientName?._errors}
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
                error={formErrors.clientEmail?._errors}
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
                error={formErrors.clientAddress?.street?._errors}
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
                  error={formErrors.clientAddress?.city?._errors}
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
                  error={formErrors.clientAddress?.postCode?._errors}
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
                  error={formErrors.clientAddress?.country?._errors}
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
            render={({ field }) => (
              <DatePicker
                label="Issue Date"
                error={formErrors.invoiceDate?._errors}
                {...field}
              />
            )}
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
                {formErrors.paymentTerms?._errors &&
                formErrors.paymentTerms?._errors.length > 0 ? (
                  <FormMessage>
                    {formErrors.paymentTerms?._errors.join(", ")}
                  </FormMessage>
                ) : (
                  <FormMessage />
                )}
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
                error={formErrors.description?._errors}
                {...field}
              />
            )}
          />
        </section>
        <section className="mt-12 sm:mt-9">
          <h2 className="font-bold text-navy-muted-dark dark:text-white">
            Item List
          </h2>
          <div className="flex flex-col gap-y-12 sm:gap-y-5">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="mt-5 grid grid-cols-[auto_1fr_1fr_auto] gap-6 sm:mt-3 sm:grid-cols-[auto_1fr_1fr_1fr_1fr]"
              >
                <FormField
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <InputWithLabel
                      className="col-span-4 w-full sm:col-span-1 sm:w-auto"
                      id={`items.${index}.name`}
                      type="text"
                      label="Item Name"
                      hasLabel={!isTablet || index === 0}
                      error={formErrors.items?.[index]?.name?._errors}
                      {...field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <InputWithLabel
                      id={`items.${index}.quantity`}
                      type="number"
                      label="Qty."
                      error={formErrors.items?.[index]?.quantity?._errors}
                      hasLabel={!isTablet || index === 0}
                      {...field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <InputWithLabel
                      id={`items.${index}.price`}
                      type="number"
                      className="w-[6.25rem]"
                      label="Price"
                      error={formErrors.items?.[index]?.price?._errors}
                      hasLabel={!isTablet || index === 0}
                      {...field}
                    />
                  )}
                />
                <div className="flex flex-col gap-2 self-start justify-self-center text-secondary">
                  {(!isTablet || index === 0) && <p>Total</p>}
                  <p className="mt-5" id={`items.${index}.total`}>
                    {(
                      Number(items[index].quantity) * Number(items[index].price)
                    ).toFixed(2)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className={!isTablet || index === 0 ? "mt-6" : "mt-1"}
                  onClick={() => remove(index)}
                >
                  <FaTrash className="text-secondary" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            className="mt-12 w-full sm:mt-5"
            onClick={() => append({ name: "", quantity: 1, price: 0 })}
          >
            + Add New Item
          </Button>
        </section>
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
