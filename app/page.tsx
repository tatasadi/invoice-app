import InvoicesTable from "@/components/sections/invoices-table"
import {
  InvoiceTableSkeleton,
  TotalInvoicesSkeleton,
} from "@/components/skeletons"
import { Button } from "@/components/ui/button"
import ButtonIcon from "@/components/ui/button-icon"
import { Suspense } from "react"
import iconPlus from "@/public/img/icon-plus.svg"
import TotalInvoices from "@/components/total-invoices"
import FilterDropdown from "@/components/filter-dropdown"
import Link from "next/link"

export default async function Page({
  searchParams,
}: {
  searchParams?: { status?: string }
}) {
  const status = searchParams?.status?.split(",") || []

  return (
    <>
      <div className="mb-14 mt-9 flex items-center sm:mt-14 lg:mt-[4.88rem]">
        <div>
          <h1 className="mb-[0.19rem] text-heading-l font-bold text-black dark:text-white sm:mb-[0.38rem]">
            Invoices
          </h1>
          <Suspense fallback={<TotalInvoicesSkeleton />}>
            <TotalInvoices />
          </Suspense>
        </div>
        <div className="ml-auto mr-10">
          <FilterDropdown />
        </div>
        <Button variant="primary" size="withIcon" asChild>
          <Link href="/create">
            <ButtonIcon icon={iconPlus} alt="icon plus" />
            New<span className="ml-1 hidden sm:inline-block">Invoice</span>
          </Link>
        </Button>
      </div>

      <Suspense fallback={<InvoiceTableSkeleton />}>
        <InvoicesTable status={status} />
      </Suspense>
    </>
  )
}
