import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form"

export default function InputWithLabel({
  id,
  label,
  className = "",
  error = [],
  hasLabel = true,
  ...props
}: {
  id: string
  label: string
  className?: string
  error?: string[]
  hasLabel?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
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
        <Input id={id} {...props} />
      </FormControl>

      {error.length > 0 ? (
        <FormMessage>{error.join(", ")}</FormMessage>
      ) : (
        <FormMessage />
      )}
    </FormItem>
  )
}
