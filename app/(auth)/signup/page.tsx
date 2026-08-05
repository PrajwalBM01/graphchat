"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const page = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message ?? "Something went wrong")
      return
    }

    router.push("/chat")
  }

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="dots" />
      <div className="z-1 flex h-1/2 w-2xl flex-col items-center justify-center gap-2 rounded-xl bg-accent">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full max-w-xs flex-col items-center justify-center gap-2">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <Button type="submit" disabled={loading} style={{ padding: 8 }}>
              {loading ? "Creating..." : "Sign up"}
            </Button>
          </div>
        </form>

        <Button
          onClick={async () =>
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/chat",
            })
          }
        >
          Google
        </Button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </div>
    </div>
  )
}

export default page
