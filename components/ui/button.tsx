import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-[0.9375rem] font-bold tracking-[-0.01563rem] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-light-bg text-blue-muted hover:bg-blue-light hover:text-blue-muted dark:bg-navy-medium dark:text-blue-light dark:hover:bg-white dark:hover:text-blue-light",
        primary: "bg-purple-primary text-white hover:bg-purple-secondary",
        destructive: "bg-red-primary text-white hover:bg-red-light",
        dark: "bg-navy-dark/80 hover:bg-navy-dark text-white hover:bg-navy-medium text-blue-gray dark:text-blue-light",
        outline: "border border-input bg-background text-black rounded",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-4",
        withIcon: "h-12 pl-2 pr-4 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
