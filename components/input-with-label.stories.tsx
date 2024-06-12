import { Meta } from "@storybook/react"
import InputWithLabel from "./input-with-label"

const meta: Meta<typeof InputWithLabel> = {
  component: InputWithLabel,
}

export default meta

export const Default = {
  args: {
    id: "name",
    label: "Name",
  },
}
