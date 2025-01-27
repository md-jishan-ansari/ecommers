import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"]
    userData: {
      id: string
      createdAt: string
      updatedAt: string,
      emailVerified: string | null,
    }
  }
}