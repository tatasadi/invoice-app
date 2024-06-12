import { Meta } from "@storybook/react"
import GoBack from "./go-back"

const meta: Meta<typeof GoBack> = {
  component: GoBack,
}

export default meta

export const Default = {
  args: {
    href: "/",
  },
}
