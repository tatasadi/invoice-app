import GoBackClient from "@/components/go-back-client"
import InvoiceCreate from "@/components/sections/invoice-create"

export default async function Page() {
  return (
    <InvoiceCreate goBackComponent={<GoBackClient className="sm:hidden" />} />
  )
}
