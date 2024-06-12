import GoBack from "@/components/go-back"
import { CiFaceFrown } from "react-icons/ci"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <CiFaceFrown className="text-3xl text-secondary" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <GoBack href="/" />
    </div>
  )
}
