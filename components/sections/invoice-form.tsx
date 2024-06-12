import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { DatePicker } from "../ui/datepicker"
import InputWithLabel from "../input-with-label"
import { DropdownSelect } from "../ui/dropdown-select"

export default function InvoiceForm({
  className = "",
}: {
  className?: string
}) {
  return (
    <form className={cn("px-6", className)}>
      <section>
        <h2 className="text-purple-primary">Bill From</h2>
        <InputWithLabel
          className="mt-6"
          id="from-street"
          type="text"
          label="Street Address"
        />
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <InputWithLabel id="from-city" type="text" label="City" />
          <InputWithLabel id="from-post-code" type="text" label="Post Code" />
          <InputWithLabel
            id="from-country"
            type="text"
            label="Country"
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </section>
      <section>
        <h2 className="mt-10 text-purple-primary sm:mt-12">Bill To</h2>
        <InputWithLabel
          className="mt-6"
          id="client-name"
          type="text"
          label="Client’s Name"
        />
        <InputWithLabel
          className="mt-6"
          id="client-email"
          type="email"
          label="Client’s Email"
        />
        <InputWithLabel
          className="mt-6"
          id="to-street"
          type="text"
          label="Street Address"
        />
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <InputWithLabel id="to-city" type="text" label="City" />
          <InputWithLabel id="to-post-code" type="text" label="Post Code" />
          <InputWithLabel
            id="to-country"
            type="text"
            label="Country"
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </section>
      <section className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="issue-date">Issue Date</Label>
          <DatePicker />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="payment-terms">Payment Terms</Label>
          <DropdownSelect
            options={[
              { value: "net1", label: "Net 1 Day" },
              { value: "net7", label: "Net 7 Days" },
              { value: "net14", label: "Net 14 Days" },
              { value: "net30", label: "Net 30 Days" },
            ]}
            onSelect={() => {}}
          />
        </div>
        <InputWithLabel
          id="project-description"
          type="text"
          label="Project Description"
          className="sm:col-span-2"
        />
      </section>
    </form>
  )
}
