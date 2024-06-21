import { fetchInvoiceById } from "@/lib/data"
import { notFound } from "next/navigation"
import { deleteInvoiceAction } from "../actions"
import ViewInvoice from "@/components/sections/view-invoice"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const invoice = await fetchInvoiceById(id)

  if (!invoice) {
    notFound()
  }

  return <ViewInvoice invoice={invoice} />
}
