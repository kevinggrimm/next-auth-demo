import { signOut } from "next-auth/react"

export default async (req, res) => {
  await signOut({
    callbackUrl: 'http://localhost:3000/'
  })
}