import { fetchInvoicesCount } from "@/lib/data"

export default async function TotalInvoices() {
  const count = await fetchInvoicesCount()

  return (
    <p className="text-[0.8125rem] leading-[0.9375rem] tracking-[-0.00625rem] text-blue-gray dark:text-blue-light">
      {count === 0
        ? "No invoices"
        : count === 1
          ? "There is 1 invoice"
          : `There are ${count} total invoices`}
    </p>
  )
}
