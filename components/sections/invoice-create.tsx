import Modal from "@/components/modal"
import InvoiceForm from "@/components/sections/invoice-form"

export default function InvoiceCreate({
  goBackComponent,
}: {
  goBackComponent: React.ReactNode
}) {
  return (
    <Modal>
      {goBackComponent}
      <h2 className="m-6 text-heading-m font-bold">New Invoice</h2>
      <InvoiceForm />
    </Modal>
  )
}
