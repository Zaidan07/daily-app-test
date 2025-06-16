"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const sessionRes = await fetch("/api/session");
      const session = await sessionRes.json();

      if (session?.user?.role === "ADMIN") {
        router.push("/admin");
      } else if (session?.user?.role === "USER") {
        router.push("/user");
      } else {
        router.push("/login");
      }
    } else {
      setError("Email atau password salah");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center">
            <Image src={Logo} alt="" width={60} height={60} />
          </div>
          <CardTitle className="flex justify-center text-2xl">
            Login ke Thousand Dream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2 mt-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full mt-5" disabled={loading}>
              {loading ? (
                <>
                  <Icons.spinner className="animate-spin mr-2 h-4 w-4" />
                  Masuk...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Belum punya akun? </span>
              <Link
                href="/register"
                className="text-sm text-blue-500 hover:underline"
              >
                Daftar di sini
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
