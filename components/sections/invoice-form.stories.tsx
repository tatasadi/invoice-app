import InvoiceForm from "./invoice-form"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof InvoiceForm> = {
  component: InvoiceForm,
}

export default meta
type Story = StoryObj<typeof InvoiceForm>

export const Default = {
  args: {},
}
