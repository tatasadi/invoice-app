import GoBackClient from "@/components/go-back-client"
import InvoiceEdit from "@/components/sections/invoice-edit"
import { fetchInvoiceById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const invoice = await fetchInvoiceById(id)

  if (!invoice) {
    notFound()
  }

  return (
    <InvoiceEdit
      goBackComponent={<GoBackClient className="sm:hidden" />}
      invoice={invoice}
    />
  )
}
