"use client";

import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { compressImage, formatFileSize } from "@/lib/imageUtils";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [username, setUsername] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Tipe file tidak didukung. Gunakan PNG, JPG, atau GIF.");
      return;
    }

    setAvatarLoading(true);
    setError("");

    try {
      let processedFile = file;

      if (file.type !== "image/gif" && file.size > 2 * 1024 * 1024) {
        console.log(`Original file size: ${formatFileSize(file.size)}`);
        processedFile = await compressImage(file, 800, 0.8);
        console.log(`Compressed file size: ${formatFileSize(processedFile.size)}`);
      }

      const maxSize = processedFile.type === "image/gif" ? 15 * 1024 * 1024 : 8 * 1024 * 1024; 
      if (processedFile.size > maxSize) {
        const maxMB = processedFile.type === "image/gif" ? "15MB" : "8MB";
        setError(`File masih terlalu besar setelah kompresi. Maksimal ${maxMB}.`);
        setAvatarLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("avatar", processedFile);

      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      let data;
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { error: text || `HTTP ${res.status}: ${res.statusText}` };
      }

      if (res.ok) {
        await update();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        if (res.status === 413) {
          setError("File terlalu besar untuk server. Coba kompres gambar atau gunakan file yang lebih kecil.");
        } else {
          setError(data.error || `Gagal mengunggah avatar (${res.status})`);
        }
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      setError("Terjadi kesalahan saat mengunggah avatar");
    } finally {
      setAvatarLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        await update();
        
        setTimeout(() => {
          if (session?.user?.role === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/user");
          }
        }, 1000);
      } else {
        setError(data.error || "Gagal memperbarui profil");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      setError("Terjadi kesalahan saat memperbarui profil");
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
            accept="image/gif,image/png,image/jpeg,image/jpg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            disabled={avatarLoading}
          />
          <div
            onClick={() => !avatarLoading && fileInputRef.current?.click()}
            className={`cursor-pointer relative h-16 w-16 ${avatarLoading ? 'opacity-50' : ''}`}
            title={avatarLoading ? "Mengunggah..." : "Ganti avatar"}
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
            {avatarLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {avatarLoading ? "Mengunggah..." : "(Klik avatar untuk mengganti)"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

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

          <Button onClick={handleSave} disabled={loading || avatarLoading}>
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