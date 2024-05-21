import logo from "@/public/img/logo.svg"
import Image from "next/image"
import { ModeToggle } from "../mode-toggle"
import avatar from "@/public/img/image-avatar.jpg"

export default function Navbar() {
  return (
    <nav className="bg-navy-muted flex items-center lg:min-h-screen lg:w-[6.4375rem] lg:flex-col lg:rounded-r-[1.25rem]">
      <div className="relative flex items-center justify-center rounded-r-[1.25rem] bg-purple-primary p-8 lg:w-full">
        <div className="absolute inset-0 top-1/2 z-0 rounded-br-[1.25rem] rounded-tl-[1.25rem] bg-purple-secondary"></div>
        <Image src={logo} alt="Logo" className="relative z-10" />
      </div>
      <ModeToggle className="ml-auto mr-6 lg:mx-auto lg:mb-8 lg:mt-auto" />
      <div className="border-navy-muted-dark border-l p-5 pl-6 sm:p-6 sm:pl-8 lg:border-l-0 lg:border-t lg:px-8 lg:py-6">
        <Image
          src={avatar}
          alt="Avatar"
          className="h-8 w-8 rounded-full lg:h-10 lg:w-10"
        />
      </div>
    </nav>
  )
}
