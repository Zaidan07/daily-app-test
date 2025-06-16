import { ReactNode } from "react"
import Navbar from "@/components/Common/Navbar"
import SidebarAdmin from "@/components/Common/Sidebar"
import { getServerSession } from "next-auth"

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession()
    const role = session?.user?.role ?? "ADMIN"
  return (
    <div className="flex h-screen">
      <SidebarAdmin role={role}/>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
