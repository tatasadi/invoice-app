"use client"

import * as React from "react"
import Image from "next/image"
import { useState } from "react"
import iconArrowDown from "@/public/img/icon-arrow-down.svg"
import { cn } from "@/lib/utils" // Make sure to import your utility function for class names

interface Option {
  value: string
  label: string
}

interface DropdownSelectProps {
  options: Option[]
  onSelect: (value: string) => void
  className?: string
}

export function DropdownSelect({
  options,
  onSelect,
  className,
}: DropdownSelectProps) {
  const [selected, setSelected] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleChange = (value: string) => {
    setSelected(value)
    setIsOpen(false)
    onSelect(value)
  }

  return (
    <div
      className={cn(
        "relative inline-block text-[0.9375rem] font-bold leading-[0.9375rem] tracking-[-0.01563rem]",
        className,
      )}
    >
      <div className="flex items-center">
        <button
          className=" block w-full appearance-none rounded border border-blue-light bg-white px-5 py-4 pr-10 text-left focus:border-purple-primary focus:outline-none focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected
            ? options.find((option) => option.value === selected)?.label
            : "Select an option..."}
        </button>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
          <Image
            src={iconArrowDown}
            alt="Dropdown Icon"
            width={12}
            height={6}
            className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-6 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-[0_10px_20px_0_rgba(72,84,159,0.25)]">
          {options.map((option) => (
            <li
              key={option.value}
              className={`cursor-pointer select-none border-b border-blue-light px-6 py-4 last:border-b-0 hover:text-purple-primary ${selected === option.value ? "text-purple-primary" : ""}`}
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
