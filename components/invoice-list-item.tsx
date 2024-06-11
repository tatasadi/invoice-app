import { formatCurrency } from "@/lib/utils"
import { Invoice } from "@prisma/client"
import React from "react"
import iconArrowRight from "@/public/img/icon-arrow-right.svg"
import Image from "next/image"
import Link from "next/link"
import StatusBadge from "./status-badge"

const InvoiceListItem = ({ invoice }: { invoice: Invoice }) => {
  return (
    <Link
      href={`/invoice/${invoice.id}`}
      className="grid cursor-pointer grid-cols-2 place-items-start rounded-lg border border-transparent bg-card p-6 shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] hover:border-purple-primary sm:grid-cols-[repeat(5,1fr)_10px] sm:place-items-center sm:gap-6"
    >
      <h3 className="row-span-2 mb-6 text-[0.9375rem] font-bold tracking-[-0.01562rem] text-black dark:text-white sm:row-span-1 sm:mb-0 sm:justify-self-start">
        <span className="text-blue-muted">#</span>
        {invoice.id}
      </h3>
      <p className="mb-2 text-[0.8125rem] font-medium tracking-[-0.00625rem] text-blue-gray dark:text-blue-light sm:mb-0 sm:justify-self-start">
        Due{" "}
        {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="col-start-2 row-span-2 row-start-1 mb-6 place-self-end text-[0.8125rem] font-medium tracking-[-0.00625rem] text-blue-gray dark:text-white sm:col-start-3 sm:row-span-1 sm:mb-0 sm:self-center sm:justify-self-start">
        {invoice.clientName}
      </p>
      <p className="row-start-4 text-left text-[0.9375rem] font-bold leading-6 tracking-[-0.01562rem] text-black dark:text-white sm:col-start-4 sm:row-start-1 sm:text-right">
        {formatCurrency(invoice.total)}
      </p>
      <StatusBadge
        status={invoice.status}
        className="col-start-2 row-span-2 w-[7rem] place-self-end sm:col-start-5 sm:row-span-1"
      />
      <Image
        src={iconArrowRight}
        alt="icon arrow right"
        className="hidden h-3 w-2 justify-self-end sm:block"
      />
    </Link>
  )
}

export default InvoiceListItem
