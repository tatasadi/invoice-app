export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <section className="absolute left-0 top-0 min-h-screen w-full bg-black/50 pt-[5.6rem] lg:pt-0">
      <div className="min-h-screen bg-background pt-4 sm:max-w-[38.5rem] sm:rounded-r-[1.25rem] lg:max-w-[45rem] lg:pl-[6.4rem]">
        {children}
      </div>
    </section>
  )
}
