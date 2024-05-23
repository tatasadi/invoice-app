import { fetchInvoicesCount } from "@/lib/data"

export default async function TotalInvoices() {
  const count = await fetchInvoicesCount()

  return (
    <p className="text-[0.8125rem] leading-[0.9375rem] tracking-[-0.00625rem] text-blue-gray dark:text-blue-light">
      {count === 0 ? (
        "No invoices"
      ) : count === 1 ? (
        <span>
          <span className="hidden sm:inline-block">There is</span>1 invoice
        </span>
      ) : (
        <span>
          <span className="mr-1 hidden sm:inline-block">There are</span>
          {count} <span className="hidden sm:inline-block"></span> invoices
        </span>
      )}
    </p>
  )
}
