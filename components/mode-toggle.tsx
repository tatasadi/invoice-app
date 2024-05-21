"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import IconSun from "./icon-sun"
import IconMoon from "./icon-moon"

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Avoid rendering the component until it's mounted to prevent mismatch errors
  if (!mounted) {
    return null
  }

  return (
    <Button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      variant="ghost"
      className={`${className}`}
    >
      {theme === "dark" ? (
        <IconSun className="w-5 fill-blue-muted hover:fill-blue-light" />
      ) : (
        <IconMoon className="w-5 fill-blue-muted hover:fill-blue-light" />
      )}
    </Button>
  )
}
