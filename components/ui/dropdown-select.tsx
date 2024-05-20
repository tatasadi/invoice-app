"use client"

import * as React from "react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
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
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const handleChange = (value: string) => {
    setSelected(value)
    setIsOpen(false)
    onSelect(value)
    buttonRef.current?.focus()
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement | HTMLLIElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setIsOpen(!isOpen)
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      setIsOpen(true)
      const firstChild = listRef.current?.firstChild as HTMLElement | null
      firstChild?.focus()
    } else if (event.key === "Escape") {
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    value: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleChange(value)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      if (event.currentTarget.previousElementSibling) {
        ;(event.currentTarget.previousElementSibling as HTMLElement).focus()
      } else {
        buttonRef.current?.focus()
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      if (event.currentTarget.nextElementSibling) {
        ;(event.currentTarget.nextElementSibling as HTMLElement).focus()
      }
    } else if (event.key === "Escape") {
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  useEffect(() => {
    if (!isOpen) {
      buttonRef.current?.focus()
    }
  }, [isOpen])

  return (
    <div
      className={cn(
        "relative inline-block text-[0.9375rem] font-bold leading-[0.9375rem] tracking-[-0.01563rem]",
        className,
      )}
    >
      <div className="flex items-center">
        <button
          ref={buttonRef}
          className="block w-full appearance-none rounded border border-blue-light bg-white px-5 py-4 pr-10 text-left focus:border-purple-primary focus:outline-none focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selected
            ? options.find((option) => option.value === selected)?.label
            : "Select an option..."}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
            <Image
              src={iconArrowDown}
              alt="Dropdown Icon"
              width={12}
              height={6}
              className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      </div>
      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-10 mt-6 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-[0_10px_20px_0_rgba(72,84,159,0.25)]"
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              tabIndex={0}
              aria-selected={selected === option.value}
              className={`cursor-pointer select-none border-b border-blue-light px-6 py-4 last:border-b-0 hover:text-purple-primary ${
                selected === option.value ? "text-purple-primary" : ""
              }`}
              onClick={() => handleChange(option.value)}
              onKeyDown={(event) => handleOptionKeyDown(event, option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
