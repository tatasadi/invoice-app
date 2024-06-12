import { Meta } from "@storybook/react"
import StatusBadge from "./status-badge"

const meta: Meta<typeof StatusBadge> = {
  component: StatusBadge,
}

export default meta

export const Paid = {
  args: {
    status: "paid",
  },
}

export const Pending = {
  args: {
    status: "pending",
  },
}

export const Draft = {
  args: {
    status: "draft",
  },
}
