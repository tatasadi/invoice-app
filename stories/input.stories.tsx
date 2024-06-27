import { Input } from "@/components/ui/input"
import { Meta } from "@storybook/react"

const meta: Meta<typeof Input> = {
  component: Input,
}

export default meta

export const Default = {
  args: {
    type: "text",
    value: "Lorem Ipsum Dolor",
  },
}
