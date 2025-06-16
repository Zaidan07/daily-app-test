import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "USER" | "ADMIN"
      name: string
      email: string
      image?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: "USER" | "ADMIN"
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "USER" | "ADMIN"
    image?: string
  }
}