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
import {
  createDraftInvoiceAction,
  createInvoiceAction,
  updateInvoiceAction,
} from "@/app/actions"
import { invoiceSchema } from "@/app/schema"
import { useState, useTransition } from "react"
import { FaTrash } from "react-icons/fa"
import { useBreakpoint } from "@/lib/hooks/tailwind"
import { useRouter } from "next/navigation"
import { InvoiceWithRelations } from "@/lib/data"

type FormErrors = z.inferFormattedError<typeof invoiceSchema>

export default function InvoiceForm({
  className = "",
  invoice = null,
}: {
  className?: string
  invoice?: InvoiceWithRelations | null
}) {
  console.log("invoice", invoice)
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [formErrors, setFormErrors] = useState<FormErrors>({} as FormErrors)
  const isTablet = useBreakpoint("sm")

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      senderAddress: {
        street: invoice?.senderAddress.street || "",
        city: invoice?.senderAddress.city || "",
        postCode: invoice?.senderAddress.postCode || "",
        country: invoice?.senderAddress.country || "",
      },
      clientName: invoice?.clientName || "",
      clientEmail: invoice?.clientEmail || "",
      clientAddress: {
        street: invoice?.clientAddress.street || "",
        city: invoice?.clientAddress.city || "",
        postCode: invoice?.clientAddress.postCode || "",
        country: invoice?.clientAddress.country || "",
      },
      invoiceDate: invoice?.invoiceDate || undefined,
      paymentTerms: invoice?.paymentTerms?.toString() || "",
      description: invoice?.description || "",
      items: invoice?.items.map((item) => ({
        name: item.name || "",
        quantity: item.quantity || 1,
        price: item.price || 0,
      })) || [
        {
          name: "",
          quantity: 1,
          price: 0,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const items = form.watch("items")

  function handleDiscard() {
    router.back()
    form.reset()
  }

  async function handleSaveAsDraft() {
    startTransition(async () => {
      await createDraftInvoiceAction({
        ...form.getValues(),
      })
      router.back()
      form.reset()
    })
  }

  async function onSubmit(data: z.infer<typeof invoiceSchema>) {
    startTransition(async () => {
      const result = invoice
        ? await updateInvoiceAction(invoice, data)
        : await createInvoiceAction(data)
      if (result?.errors) {
        setFormErrors(result.errors)
      } else {
        setFormErrors({} as FormErrors)
        router.back()
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className={cn("pb-[12rem]", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="px-6">
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
                    initialSelected={invoice?.paymentTerms?.toString() || ""}
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
                        Number(items[index].quantity) *
                        Number(items[index].price)
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
        </div>
        <div className="fixed inset-0 top-auto w-full sm:right-auto sm:max-w-[38.5rem] lg:max-w-[45rem] lg:pl-[6.4rem]">
          <div className="h-16 w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,_rgba(0,0,0,0.10)_100%)]"></div>
          <section className="bg-background p-6 shadow-[0px_10px-10px_-10px_rgba(72,84,159,0.10)] sm:rounded-r-[1.25rem] sm:px-14 sm:py-8 sm:shadow-none">
            {invoice ? (
              <div className="flex w-full items-center gap-2">
                <Button
                  type="button"
                  className="ml-auto dark:bg-light-bg dark:text-blue-muted"
                  onClick={handleDiscard}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={pending}>
                  Sava Changes
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <Button
                  type="button"
                  className="dark:bg-light-bg dark:text-blue-muted"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
                <Button
                  type="button"
                  variant="dark"
                  className="sm:ml-auto"
                  disabled={pending}
                  onClick={handleSaveAsDraft}
                >
                  Save as Draft
                </Button>
                <Button variant="primary" type="submit" disabled={pending}>
                  Sava & Send
                </Button>
              </div>
            )}
          </section>
        </div>
      </form>
    </Form>
  )
}
