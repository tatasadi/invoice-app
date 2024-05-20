import Image, { StaticImageData } from "next/image"

export default function ButtonIcon({
  icon,
  alt,
}: {
  icon: StaticImageData
  alt: string
}) {
  return (
    <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
      <Image src={icon} alt={alt} />
    </span>
  )
}
