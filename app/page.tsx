// "use client"
import { Button } from "@/components/ui/button"
import LaserFlow from "@/components/LaserFlow"
import Link from "next/link"
export default function Page() {
  return (
    <div className="h-dvh w-full">
      <section className="flex h-screen items-center justify-center border border-red-700">
        <div>
          <Link href={"/signup"}>
            <Button size={"lg"}>Get started</Button>
          </Link>
        </div>
      </section>
      <section>Problem?solution?</section>
      <section>features</section>
      <section>faq</section>
      <section>footer</section>
    </div>
  )
}
