"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

export default function AdminDailyPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/daily/admin/missing")
      const data = await res.json()
      setUsers(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Daily Monitoring</h1>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3"><Skeleton className="h-6 w-48" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-6 w-64" /></td>
                  </tr>
                ))
              : users.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4 text-gray-500">
                      Semua user sudah melakukan daily hari ini 🎉
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b last:border-none">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {user.image ? (
                            <AvatarImage src={user.image} alt={user.name} />
                          ) : (
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          )}
                        </Avatar>
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{user.email}</td>
                      <td className="px-4 py-3 text-gray-700">Belum daily</td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
