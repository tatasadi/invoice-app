import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form"

export default function InputWithLabel({
  id,
  label,
  className = "",
  error = [],
  ...props
}: {
  id: string
  label: string
  className?: string
  error?: string[]
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FormItem className={cn("flex flex-col gap-2", className)}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
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
