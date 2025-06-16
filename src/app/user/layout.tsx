import { ReactNode } from "react"
import Navbar from "@/components/Common/Navbar"
import SidebarUser from "@/components/Common/Sidebar"
import { getServerSession } from "next-auth"

export default async function UserLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession()
    const role = session?.user?.role ?? "USER"
  return (
    <div className="flex h-screen">
      <SidebarUser role={role}/>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
