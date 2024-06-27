import GoBack from "@/components/go-back"
import { Meta } from "@storybook/react"

const meta: Meta<typeof GoBack> = {
  component: GoBack,
}

export default meta

export const Default = {
  args: {
    href: "/",
  },
}
