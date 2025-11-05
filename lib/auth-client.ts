import { createAuthClient } from "better-auth/react"
 
export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL!, // Optional if the API base URL matches the frontend
})
 
export const { signIn, signOut, useSession } = authClient