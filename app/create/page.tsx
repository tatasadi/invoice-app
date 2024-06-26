import GoBack from "@/components/go-back"
import InvoiceCreate from "@/components/sections/invoice-create"

export default async function Page() {
  return (
    <InvoiceCreate
      goBackComponent={<GoBack href="/" className="ml-6 sm:hidden" />}
    />
  )
}
