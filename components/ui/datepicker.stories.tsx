import { DatePicker } from "./datepicker"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default = {
  args: {},
}
