"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebarNavigation } from "@/lib/use-sidebar-navigation"

export default function RetailSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { navigateWithLoading } = useSidebarNavigation()

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/shop", label: "Shop", icon: "🛍️" },
    { href: "/orders", label: "My Orders", icon: "📋" },
    { href: "/wishlist", label: "Wishlist", icon: "❤️" },
    { href: "/profile", label: "Profile", icon: "👤" }
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className={`bg-white border-r transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full"
          >
            {isCollapsed ? "→" : "←"}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Button
                  variant="ghost"
                  onClick={() => navigateWithLoading(item.href)}
                  className={`w-full justify-start h-auto p-3 ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="p-4 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Orders</span>
                <Badge variant="secondary">15</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Loyalty Points</span>
                <Badge variant="secondary">2,450</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Wishlist Items</span>
                <Badge variant="secondary">8</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

