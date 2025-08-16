"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Header from "./header"
import Footer from "./footer"
import AdminSidebar from "./sidebar-admin"
import EmployeeSidebar from "./sidebar-employee"
import RetailSidebar from "./sidebar-retail"
import ResellerSidebar from "./sidebar-reseller"
import { LoadingSpinnerFullScreen } from "@/components/ui/loading-spinner"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <LoadingSpinnerFullScreen 
        text="Loading your dashboard..."
        color="orange"
      />
    )
  }

  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  const user = session?.user
  if (!user) {
    redirect("/auth/login")
  }

  // Render appropriate sidebar based on user role
  const renderSidebar = () => {
    switch (user.role) {
      case "ADMIN":
        return <AdminSidebar />
      case "EMPLOYEE":
        return <EmployeeSidebar />
      case "RETAIL_CUSTOMER":
        return <RetailSidebar />
      case "RESELLER_CUSTOMER":
        return <ResellerSidebar />
      default:
        return <RetailSidebar /> // Default fallback
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content with Sidebar */}
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {renderSidebar()}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

