"use client"
import { deleteInvoiceAction } from "@/app/actions"
import GoBack from "@/components/go-back"
import StatusBadge from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { InvoiceWithRelations } from "@/lib/data"
import { formatDate, formatCurrency } from "@/lib/utils"

export default function ViewInvoice({
  invoice,
}: {
  invoice: InvoiceWithRelations
}) {
  const {
    id,
    status,
    description,
    senderAddress,
    clientAddress,
    createdAt,
    paymentDue,
    clientName,
    clientEmail,
    items,
    total,
  } = invoice

  async function handleDelete() {
    await deleteInvoiceAction(id)
  }

  return (
    <>
      <GoBack href="/" />
      <div className="mt-8 rounded-lg bg-card p-6 shadow-lg sm:flex sm:justify-between sm:p-8">
        <div className="flex items-center justify-between gap-5 sm:justify-start">
          <p>Status</p>
          <StatusBadge status={status} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex w-full justify-center gap-2 bg-card p-5 sm:relative sm:w-fit sm:bg-none sm:p-0">
          <Button>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary">Mark as Paid</Button>
        </div>
      </div>
      <div className="mb-28 mt-4 rounded-lg bg-card p-6 shadow-lg sm:p-12">
        <div className="sm:flex sm:justify-between">
          <div>
            <h2>
              <span className="text-secondary">#</span>
              {id}
            </h2>
            <p className="heading-s text-secondary">{description}</p>
          </div>
          <div className="pt-7 text-secondary sm:pt-0 sm:text-right">
            <p>{senderAddress.street}</p>
            <p>{senderAddress.city}</p>
            <p>{senderAddress.postCode}</p>
            <p>{senderAddress.country}</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:mt-5 sm:grid-cols-3">
          <div>
            <h3 className="text-secondary">Invoice Date</h3>
            <p className="mt-3 font-bold">{formatDate(createdAt)}</p>
            <h3 className="mt-8 text-secondary">Payment Due</h3>
            <p className="mt-3 font-bold">{formatDate(paymentDue)}</p>
          </div>
          <div>
            <h3 className="text-secondary">Bill To</h3>
            <p className="mt-3 font-bold">{clientName}</p>
            <div className="mt-2 text-secondary">
              <p>{clientAddress.street}</p>
              <p>{clientAddress.city}</p>
              <p>{clientAddress.postCode}</p>
              <p>{clientAddress.country}</p>
            </div>
          </div>
          <div className="mt-8 sm:mt-0">
            <h3 className="text-secondary">Sent to</h3>
            <p className="mt-3 font-bold">{clientEmail}</p>
          </div>
        </div>
        <div className="mt-9 rounded-b-lg bg-light-bg dark:bg-navy-medium sm:mt-11 sm:rounded-t-lg">
          <div className="flex flex-col gap-8 p-8 pb-10">
            <div className="hidden grid-cols-2 justify-items-end font-medium text-secondary sm:grid sm:grid-cols-5">
              <div className="col-span-2 justify-self-start font-medium text-secondary">
                Item Name
              </div>
              <div className="justify-self-center font-medium text-secondary">
                QTY.
              </div>
              <div className="font-medium text-secondary">Price</div>
              <div className="font-medium text-secondary">Total</div>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-2 justify-items-end font-bold sm:grid-cols-5"
              >
                <p className="justify-self-start sm:col-span-2">{item.name}</p>
                <p className="hidden justify-self-center text-secondary sm:block">
                  {item.quantity}
                </p>
                <p className="row-start-2 mt-2 justify-self-start text-secondary sm:row-start-auto sm:mt-0 sm:justify-self-auto">
                  <span className="sm:hidden">{item.quantity} x </span>
                  {formatCurrency(item.price)}
                </p>
                <p className="row-span-2 self-center sm:row-span-1 sm:self-auto">
                  {formatCurrency(item.total)}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-b-lg bg-navy-muted text-white dark:bg-black">
            <div className="flex items-center justify-between p-6 sm:px-8">
              <p className="hidden sm:block">Amount Due</p>
              <p className="sm:hidden">Grand Total</p>
              <p className="text-heading-s">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
