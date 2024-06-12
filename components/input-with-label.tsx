import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function InputWithLabel({
  id,
  label,
  className = "",
  ...props
}: {
  id: string
  label: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  )
}
