import { authClient } from "@/lib/auth-client";

export const getUserSession = async () => {
  const { data: session, error } = await authClient.getSession()
  if (error) {
    console.error(error)
    return null
  }
  return session
}