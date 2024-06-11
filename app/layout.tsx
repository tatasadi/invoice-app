import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./theme-provider"
import Navbar from "@/components/sections/navbar"

const leagueSpartan = League_Spartan({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Invoice App",
  description: "A simple invoice app built with Next.js and TypeScript",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.className} text-body`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main className="relative mx-auto min-h-screen bg-background">
            <Navbar />
            <div className="mx-auto max-w-[60rem] px-6 py-8 lg:pl-[8rem]">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
