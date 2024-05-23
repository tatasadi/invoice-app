import InvoicesTable from "@/components/sections/invoices-table"
import Navbar from "@/components/sections/navbar"
import { InvoiceTableSkeleton } from "@/components/skeletons"
import { Button } from "@/components/ui/button"
import ButtonIcon from "@/components/ui/button-icon"
import { Suspense } from "react"
import iconPlus from "@/public/img/icon-plus.svg"

export default function Home() {
  return (
    <main className="relative mx-auto min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-[60rem] px-6 py-8 lg:pl-[8rem]">
        <div className="mb-14 mt-9 flex items-center sm:mt-14 lg:mt-[4.88rem]">
          <div>
            <h1 className="mb-[0.19rem] text-heading-l font-bold text-black dark:text-white sm:mb-[0.38rem]">
              Invoices
            </h1>
            <p className="text-[0.8125rem] leading-[0.9375rem] tracking-[-0.00625rem] text-blue-gray dark:text-blue-light">
              No invoices
            </p>
          </div>
          <div className="ml-auto mr-10">Filter</div>
          <Button variant="primary" size="withIcon">
            <ButtonIcon icon={iconPlus} alt="icon plus" />
            New<span className="ml-1 hidden sm:inline-block">Invoice</span>
          </Button>
        </div>

        <Suspense fallback={<InvoiceTableSkeleton />}>
          <InvoicesTable />
        </Suspense>
      </div>
    </main>
  )
}
