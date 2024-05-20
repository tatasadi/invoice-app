"use client"

import * as React from "react"
import { format } from "date-fns"
import iconCalendar from "@/public/img/icon-calendar.svg"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-between text-left font-bold text-foreground",
            !date && "text-muted-foreground",
          )}
        >
          {date ? format(date, "d MMM yyyy") : <span>Pick a date</span>}
          <Image
            src={iconCalendar}
            alt="icon calendar"
            className="ml-2 h-4 w-4"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-6 w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
