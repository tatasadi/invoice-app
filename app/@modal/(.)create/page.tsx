import GoBackClient from "@/components/go-back-client"
import InvoiceForm from "@/components/sections/invoice-form"

export default async function Page() {
  return (
    <section className="absolute inset-0 w-full bg-black/50 pt-[5.6rem] lg:pt-0">
      <div className="h-full bg-background pt-4 sm:max-w-[38.5rem] lg:max-w-[45rem] lg:pl-[6.4rem]">
        <GoBackClient className="sm:hidden" />
        <h2 className="m-6 text-heading-m font-bold">New Invoice</h2>
        <InvoiceForm />
      </div>
    </section>
  )
}
