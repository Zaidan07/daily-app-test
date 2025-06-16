import { prisma } from "@/lib/prisma"

export async function getAllDailies() {
  return await prisma.daily.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}