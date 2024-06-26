import Modal from "@/components/modal"
import InvoiceForm from "@/components/sections/invoice-form"
import { InvoiceWithRelations } from "@/lib/data"

export default function InvoiceEdit({
  goBackComponent,
  invoice,
}: {
  goBackComponent: React.ReactNode
  invoice: InvoiceWithRelations
}) {
  return (
    <Modal>
      {goBackComponent}
      <h2 className="m-6 text-heading-m font-bold">
        Edit <span className="text-secondary">#</span>
        {invoice.id}
      </h2>
      <InvoiceForm invoice={invoice} />
    </Modal>
  )
}
