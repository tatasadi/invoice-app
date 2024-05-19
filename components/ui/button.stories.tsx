import type { Meta, StoryObj } from "@storybook/react"

import { Button, ButtonProps } from "./button"

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Button3Default: Story = {
  args: {
    children: "Edit",
  },
}
