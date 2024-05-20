import { Input } from "./input"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Input> = {
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Default = {
  args: {
    type: "text",
    value: "Lorem Ipsum Dolor",
  },
}
