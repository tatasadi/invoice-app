import InvoicesTable from "@/components/sections/invoices-table"
import Navbar from "@/components/sections/navbar"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="relative mx-auto min-h-screen bg-background-light">
      <Navbar />
      <div className="mx-auto max-w-[90rem] px-6 py-8 lg:pl-[8rem]">
        <Suspense fallback={<div>Loading...</div>}>
          <InvoicesTable />
        </Suspense>
      </div>
    </main>
  )
}
