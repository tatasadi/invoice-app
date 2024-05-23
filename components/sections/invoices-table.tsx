import { fetchLatestInvoices } from "@/lib/data"
import { Invoice } from "@prisma/client"
import InvoiceListItem from "../invoice-list-item"
import illustrationEmpty from "@/public/img/illustration-empty.svg"
import Image from "next/image"

export default async function InvoicesTable() {
  const invoices = await fetchLatestInvoices()
  if (invoices.length === 0)
    return (
      <div className="mt-[9.19rem] flex flex-col items-center">
        <Image src={illustrationEmpty} alt="Empty invoices" />
        <h2 className="mt-12 text-2xl font-bold text-black dark:text-white">
          There is nothing here
        </h2>
        <p className="mt-6 max-w-[12.5rem] text-center text-[0.8125rem] font-medium leading-[0.9375rem] tracking-[-0.00625rem] text-blue-gray dark:text-blue-light">
          Create an invoice by clicking the <strong>New Invoices</strong> button
          and get started
        </p>
      </div>
    )

  return (
    <div className="grid gap-4">
      {invoices.map((invoice: Invoice) => (
        <InvoiceListItem invoice={invoice} key={invoice.id} />
      ))}
    </div>
  )
}
