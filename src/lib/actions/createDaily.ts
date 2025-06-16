"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export async function createDaily(note: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existing = await prisma.daily.findFirst({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: today
      }
    }
  })

  if (existing) throw new Error("Kamu sudah mengisi daily hari ini.")

    const formattedContent = note
    .split("\n")
    .map(line => line.trimStart().startsWith("- ") ? line.replace("- ", "• ") : line)
    .join("\n")


  await prisma.daily.create({
    data: {
      note: formattedContent,
      userId: session.user.id,
      date: new Date(),
    }
  })
}
