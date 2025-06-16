import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const dateParam = searchParams.get('date') // optional, default hari ini

  const targetDate = dateParam ? new Date(dateParam) : new Date()
  targetDate.setHours(0, 0, 0, 0)

  const allUsers = await prisma.user.findMany({
    include: {
      dailies: {
        where: { date: targetDate },
      },
    },
  })

  const result = allUsers.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    daily: user.dailies[0] ?? null,
  }))

  return NextResponse.json(result)
}