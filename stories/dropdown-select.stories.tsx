import { DropdownSelect } from "@/components/ui/dropdown-select"
import { Meta } from "@storybook/react"

const meta: Meta<typeof DropdownSelect> = {
  component: DropdownSelect,
}

export default meta

export const Default = {
  args: {
    options: [
      { value: "net1", label: "Net 1 Day" },
      { value: "net7", label: "Net 7 Days" },
      { value: "net14", label: "Net 14 Days" },
      { value: "net30", label: "Net 30 Days" },
    ],
    onSelect: (value: string) => console.log(value),
    className: "w-60",
  },
}
