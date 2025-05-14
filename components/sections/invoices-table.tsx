// components/InvoicesTable.tsx
import Image from 'next/image'
import illustrationEmpty from '@/public/img/illustration-empty.svg'

import { fetchLatestInvoices } from '@/lib/data'
import InvoiceListItem from '../invoice-list-item'
import { InvoiceDTO } from "@/models/invoice"

export default async function InvoicesTable({
    status,
    currentPage,
  }: {
    status?: string[]
    currentPage: number
  }) {
  // Now returns InvoiceDTO[], where `id` is already a string
  const invoices = await fetchLatestInvoices(currentPage, status)

  if (invoices.length === 0) {
    return (
      <div className="mt-[9.19rem] flex flex-col items-center">
        <Image src={illustrationEmpty} alt="Empty invoices" />
        <h2 className="mt-12 text-2xl font-bold text-black dark:text-white">
          There is nothing here
        </h2>
        <p className="mt-6 max-w-[12.5rem] text-center text-[0.8125rem] font-medium leading-[0.9375rem] tracking-[-0.00625rem] text-blue-gray dark:text-blue-light">
          Create an invoice by clicking the <strong>New Invoice</strong> button
          and get started
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {invoices.map((inv: InvoiceDTO) => (
        <InvoiceListItem
          invoice={inv}
          key={inv.invoiceNumber}
        />
      ))}
    </div>
  )
}
