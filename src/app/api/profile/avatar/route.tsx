import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type: ${file.type}. Allowed: ${allowedTypes.join(", ")}` 
      }, { status: 400 });
    }

    const maxSize = file.type === "image/gif" ? 15 * 1024 * 1024 : 8 * 1024 * 1024; // 15MB for GIF, 8MB for others
    if (file.size > maxSize) {
      const maxMB = file.type === "image/gif" ? "15MB" : "8MB";
      return NextResponse.json({ 
        error: `File terlalu besar. Maksimal ${maxMB}` 
      }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `avatar_${session.user.id}_${uuidv4()}.${ext}`;

    console.log(`Uploading file: ${filename}, size: ${file.size}, type: ${file.type}`);

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const currentUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { avatar: true }
      });

      if (currentUser?.avatar) {
        const oldFilename = currentUser.avatar.split('/').pop();
        if (oldFilename) {
          await supabase.storage
            .from("avatars")
            .remove([oldFilename]);
        }
      }

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filename, buffer, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return NextResponse.json({ 
          error: `Upload failed: ${uploadError.message}` 
        }, { status: 500 });
      }

      console.log("Upload successful:", uploadData);

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filename);

      const avatarUrl = publicUrlData.publicUrl;
      
      if (!avatarUrl) {
        return NextResponse.json({ 
          error: "Failed to generate public URL" 
        }, { status: 500 });
      }

      console.log("Public URL generated:", avatarUrl);

      await prisma.user.update({
        where: { id: session.user.id },
        data: { avatar: avatarUrl },
      });

      console.log("Database updated successfully");

      return NextResponse.json({ 
        success: true, 
        url: avatarUrl,
        message: "Avatar uploaded successfully"
      });

    } catch (supabaseError) {
      console.error("Supabase operation error:", supabaseError);
      return NextResponse.json({ 
        error: `Storage operation failed: ${supabaseError}` 
      }, { status: 500 });
    }

  } catch (err) {
    console.error("Unexpected error in avatar upload:", err);
    return NextResponse.json({ 
      error: `Internal server error: ${err instanceof Error ? err.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}