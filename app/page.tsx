import InvoicesTable from "@/components/sections/invoices-table"
import Navbar from "@/components/sections/navbar"
import { InvoiceTableSkeleton } from "@/components/skeletons"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="relative mx-auto min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-[60rem] px-6 py-8 lg:pl-[8rem]">
        <Suspense fallback={<InvoiceTableSkeleton />}>
          <InvoicesTable />
        </Suspense>
      </div>
    </main>
  )
}
