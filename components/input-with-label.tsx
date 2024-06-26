import React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form"

const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  {
    id: string
    label: string
    className?: string
    error?: string[]
    hasLabel?: boolean
  } & React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    { id, label, className = "", error = [], hasLabel = true, ...props },
    ref,
  ) => {
    return (
      <FormItem className={cn("flex flex-col gap-2", className)}>
        {hasLabel && (
          <FormLabel
            htmlFor={id}
            className="text-[0.8125rem] leading-[0.9375rem] tracking-[-0.00625rem]"
          >
            {label}
          </FormLabel>
        )}
        <FormControl>
          <Input id={id} ref={ref} {...props} />
        </FormControl>

        {error.length > 0 ? (
          <FormMessage>{error.join(", ")}</FormMessage>
        ) : (
          <FormMessage />
        )}
      </FormItem>
    )
  },
)

InputWithLabel.displayName = "InputWithLabel"

export default InputWithLabel
