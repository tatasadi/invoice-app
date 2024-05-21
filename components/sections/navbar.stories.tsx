import Navbar from "./navbar"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Navbar> = {
  component: Navbar,
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default = {
  args: {},
}
