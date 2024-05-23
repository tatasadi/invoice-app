"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import iconArrowDown from "@/public/img/icon-arrow-down.svg"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCheckboxChange = (status: string) => {
    const params = new URLSearchParams(searchParams)
    const selectedStatuses = params.get("status")
      ? params.get("status")?.split(",")
      : []

    if (selectedStatuses) {
      if (selectedStatuses.includes(status)) {
        const newStatuses = selectedStatuses.filter((s) => s !== status)
        if (newStatuses.length > 0) {
          params.set("status", newStatuses.join(","))
        } else {
          params.delete("status")
        }
      } else {
        selectedStatuses.push(status)
        params.set("status", selectedStatuses.join(","))
      }
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          variant="ghost"
          className="text-[0.9375rem] font-bold tracking-[-0.01563rem] text-black dark:text-white"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          Filter
          <span className="ml-1 hidden sm:inline-block">by status</span>
          <Image src={iconArrowDown} alt="icon arrow down" className="ml-3" />
        </Button>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 mt-5 flex w-48 origin-top-left flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_10px_20px_0px_rgba(72,84,159,0.25)] dark:bg-navy-medium dark:shadow-[0_10px_20px_0px_rgba(0,0,0,0.25)]"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {["draft", "pending", "paid"].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={status}
                defaultChecked={searchParams
                  .get("status")
                  ?.split(",")
                  .includes(status)}
                onCheckedChange={() => handleCheckboxChange(status)}
              />
              <label
                htmlFor={status}
                className="text-heading-s-variant capitalize"
              >
                {status}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
