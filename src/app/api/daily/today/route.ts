import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daily = await prisma.daily.findFirst({
        where: {
            userId,
            date: today,
        },
    });

    return NextResponse.json({ complate: !!daily, note:daily?.note  || null });
}