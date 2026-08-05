import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()

const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  })
}
