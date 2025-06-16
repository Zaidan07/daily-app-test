"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setname] = useState("")
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
  })

  const handleRegister = async () => {
    const newErrors = {
      email: email ? "" : "Email wajib diisi.",
      name: name ? "" : "name wajib diisi.",
      password: password ? "" : "Password wajib diisi.",
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((err) => err)) return

    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      toast.success("Akun berhasil dibuat!")
      router.push("/login")
    } else {
      const data = await res.json()
      toast.error(data.message || "Gagal mendaftar.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl">
            Register ke Thousand Dream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label className="mb-2">Username</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
