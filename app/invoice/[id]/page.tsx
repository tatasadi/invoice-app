import GoBack from "@/components/go-back"
import StatusBadge from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { fetchInvoiceById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const invoice = await fetchInvoiceById(id)

  if (!invoice) {
    notFound()
  }
  const { status, description, senderAddress: sender } = invoice

  return (
    <>
      <GoBack href="/" />
      <div className="mt-8 rounded-lg bg-card p-6 sm:flex sm:justify-between sm:p-8">
        <div className="flex items-center justify-between gap-5 sm:justify-start">
          <p>Status</p>
          <StatusBadge status={status} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex w-full justify-center gap-2 bg-card p-5 sm:relative sm:w-fit sm:bg-none sm:p-0">
          <Button>Edit</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="primary">Mark as Paid</Button>
        </div>
      </div>
      <div className="mt-4 bg-card p-6 sm:p-12">
        <div className="sm:flex sm:justify-between">
          <div>
            <h2>
              <span className="text-secondary">#</span>
              {id}
            </h2>
            <p className="heading-s text-secondary">{description}</p>
          </div>
          <div className="pt-7 text-secondary sm:pt-0 sm:text-right">
            <p>{sender.street}</p>
            <p>{sender.city}</p>
            <p>{sender.postCode}</p>
            <p>{sender.country}</p>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(invoice, null, 2)}</pre>
    </>
  )
}
