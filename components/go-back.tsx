import { cn } from "@/lib/utils"
import iconArrowLeft from "@/public/img/icon-arrow-left.svg"
import Image from "next/image"
import Link from "next/link"

export default function GoBack({
  href,
  className = "",
}: {
  href: string
  className?: string
}) {
  return (
    <Link href={href} className={cn("flex items-center gap-6", className)}>
      <Image src={iconArrowLeft} alt="icon arrow left" className="h-3 w-2" />
      <span>Go back</span>
    </Link>
  )
}
