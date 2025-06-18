"use client";

import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [username, setUsername] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      await update();
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      });

      if (res.ok) {
        setSuccess(true);
        await update();
        if (session?.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg h-screen mx-auto flex items-center">
      <div className="w-full bg-white p-6 rounded shadow border">
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            accept="image/gif,image/png,image/jpeg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer"
            title="Ganti avatar"
          >
            <Avatar className="h-16 w-16 mb-2">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt="profile" />
              ) : (
                <AvatarFallback>
                  {session?.user?.name?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <p className="text-sm text-gray-500">(Klik avatar untuk mengganti)</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input value={session?.user?.email || ""} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Input value={session?.user?.role || ""} disabled />
          </div>

          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
          {success && (
            <p className="text-green-600 text-sm">
              Profil berhasil diperbarui!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}