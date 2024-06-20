"use client"
import iconArrowLeft from "@/public/img/icon-arrow-left.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function GoBackClient({
  className = "",
}: {
  className?: string
}) {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      className={cn("flex items-center gap-6", className)}
      onClick={() => router.back()}
    >
      <Image src={iconArrowLeft} alt="icon arrow left" className="h-3 w-2" />
      <span>Go back</span>
    </Button>
  )
}
