// "use client"
import { Button } from "@/components/ui/button"
import LaserFlow from "@/components/LaserFlow"
export default function Page() {
  return (
    <div className="h-dvh w-full">
      <section className="flex h-screen items-center justify-center border border-red-700">
        <div>
          <Button size={"lg"}>Get started</Button>
        </div>
      </section>
      <section>Problem?solution?</section>
      <section>features</section>
      <section>faq</section>
      <section>footer</section>
    </div>
  )
}
