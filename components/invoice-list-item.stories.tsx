import InvoiceListItem from "./invoice-list-item"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof InvoiceListItem> = {
  component: InvoiceListItem,
}

export default meta
type Story = StoryObj<typeof InvoiceListItem>

export const Paid = {
  args: {
    invoice: {
      id: "RT3080",
      clientName: "Jensen Huang",
      paymentDue: new Date("2021-08-19").toISOString(),
      total: 1800.9,
      status: "paid",
    },
  },
}

export const Pending = {
  args: {
    invoice: {
      id: "RT3080",
      clientName: "Jensen Huang",
      paymentDue: new Date("2021-08-19").toISOString(),
      total: 1800.9,
      status: "pending",
    },
  },
}

export const Draft = {
  args: {
    invoice: {
      id: "RT3080",
      clientName: "Jensen Huang",
      paymentDue: new Date("2021-08-19").toISOString(),
      total: 1800.9,
      status: "draft",
    },
  },
}
