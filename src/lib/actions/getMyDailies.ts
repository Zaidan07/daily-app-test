"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export async function getMyDailies() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return []

  const dailies = await prisma.daily.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return dailies
}
