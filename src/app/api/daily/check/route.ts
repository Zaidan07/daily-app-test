import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { isSameDay } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const latestDaily = await prisma.daily.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const isDoneToday = latestDaily
    ? isSameDay(new Date(), new Date(latestDaily.createdAt))
    : false;

  return NextResponse.json({ doneToday: isDoneToday });
}
