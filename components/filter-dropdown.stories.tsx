import FilterDropdown from "./filter-dropdown"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof FilterDropdown> = {
  component: FilterDropdown,
}

export default meta
type Story = StoryObj<typeof FilterDropdown>

export const Default = {
  args: {},
}
