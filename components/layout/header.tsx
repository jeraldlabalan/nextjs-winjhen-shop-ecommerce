"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const user = session.user

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrator"
      case "EMPLOYEE":
        return "Employee"
      case "RETAIL_CUSTOMER":
        return "Retail Customer"
      case "RESELLER_CUSTOMER":
        return "Reseller Customer"
      default:
        return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800"
      case "EMPLOYEE":
        return "bg-blue-100 text-blue-800"
      case "RETAIL_CUSTOMER":
        return "bg-green-100 text-green-800"
      case "RESELLER_CUSTOMER":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <header className="bg-white shadow-sm border-b h-16">
      <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Winjhen Shop</span>
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Role Badge */}
          <Badge className={getRoleColor(user.role)}>
            {getRoleDisplayName(user.role)}
          </Badge>

          {/* User Profile Display */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}

