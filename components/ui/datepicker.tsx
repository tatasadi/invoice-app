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
import { FormControl, FormItem, FormLabel, FormMessage } from "./form"

export function DatePicker({ label, ...field }: { label: string } & any) {
  return (
    <FormItem className="flex flex-col gap-1">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "justify-between text-left font-bold text-foreground",
                !field.value && "text-muted-foreground",
              )}
            >
              {field.value ? (
                format(field.value, "d MMM yyyy")
              ) : (
                <span>Pick a date</span>
              )}
              <Image
                src={iconCalendar}
                alt="icon calendar"
                className="ml-2 h-4 w-4"
              />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="mt-6 w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
