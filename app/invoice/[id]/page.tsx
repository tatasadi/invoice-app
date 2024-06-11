import StatusBadge from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { fetchInvoiceById } from "@/lib/data"
import iconArrowLeft from "@/public/img/icon-arrow-left.svg"
import Image from "next/image"
import Link from "next/link"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const invoice = await fetchInvoiceById(id)
  const { status } = invoice

  return (
    <>
      <Link href="/" className="flex gap-6">
        <Image src={iconArrowLeft} alt="icon arrow left" className="h-3 w-2" />{" "}
        Go back
      </Link>
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
      <pre>{JSON.stringify(invoice, null, 2)}</pre>
    </>
  )
}
