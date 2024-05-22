import { fetchLatestInvoices } from "@/lib/data"
import { Invoice } from "@prisma/client"
import InvoiceListItem from "../invoice-list-item"

export default async function InvoicesTable() {
  const invoices = await fetchLatestInvoices()
  return (
    <div className="grid gap-4">
      {invoices.map((invoice: Invoice) => (
        <InvoiceListItem invoice={invoice} key={invoice.id} />
      ))}
    </div>
  )
}
