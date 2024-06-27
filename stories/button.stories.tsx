import type { Meta, StoryObj } from "@storybook/react"
import iconPlus from "@/public/img/icon-plus.svg"
import ButtonIcon from "@/components/ui/button-icon"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Button1WithIcon: Story = {
  args: {
    children: (
      <>
        <ButtonIcon icon={iconPlus} alt="icon plus" />
        New Invoice
      </>
    ),
    variant: "primary",
    size: "withIcon",
  },
}

export const Button2Primary: Story = {
  args: {
    children: "Mark as Paid",
    variant: "primary",
  },
}

export const Button3Default: Story = {
  args: {
    children: "Edit",
  },
}

export const Button4Dark: Story = {
  args: {
    children: "Save as Draft",
    variant: "dark",
  },
}

export const Button5Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
}
