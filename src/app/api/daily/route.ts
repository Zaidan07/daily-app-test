import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const body = await req.json();

  const { userId, note } = body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const existing = await prisma.daily.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Daily sudah diisi hari ini" },
        { status: 400 }
      );
    }

    const daily = await prisma.daily.create({
      data: {
        userId,
        note,
        date: today,
      },
    });

    return NextResponse.json({ success: true, daily });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menyimpan daily" },
      { status: 500 }
    );
  }
}
