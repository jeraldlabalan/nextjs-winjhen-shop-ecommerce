"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import MainLayout from "@/components/layout/main-layout"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  const user = session?.user

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard")
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

  // Mock data - replace with actual data from your API
  const mockStats = {
    totalUsers: 1247,
    totalOrders: 892,
    totalRevenue: 45678.90,
    pendingResellerOrders: 23
  }

  const mockRecentUsers = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "RETAIL_CUSTOMER", status: "active", joined: "2 days ago" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "RESELLER_CUSTOMER", status: "active", joined: "3 days ago" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "EMPLOYEE", status: "active", joined: "1 week ago" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "RETAIL_CUSTOMER", status: "pending", joined: "1 week ago" }
  ]

  const mockPendingResellerOrders = [
    { id: "1", reseller: "Tech Solutions Inc.", amount: 1250.00, items: 15, requested: "1 day ago" },
    { id: "2", reseller: "Global Electronics", amount: 890.50, items: 8, requested: "2 days ago" },
    { id: "3", reseller: "Digital World", amount: 2100.00, items: 22, requested: "3 days ago" }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.firstName}! Manage your e-commerce platform</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reseller Orders</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingResellerOrders}</div>
            <p className="text-xs text-muted-foreground">Require approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="reseller-orders">Reseller Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRoleColor(user.role)}>
                            {getRoleDisplayName(user.role)}
                          </Badge>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{user.joined}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Users</Button>
                </div>
              </CardContent>
            </Card>

            {/* Pending Reseller Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Reseller Orders</CardTitle>
                <CardDescription>Orders awaiting admin approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingResellerOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium">{order.reseller}</p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                        <p className="text-lg font-bold text-green-600">${order.amount.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{order.requested}</p>
                        <Button size="sm" className="mt-2">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Pending Orders</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage all users across different roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search users..." />
                </div>
                <Button>Add New User</Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4 p-3 bg-gray-100 rounded-lg font-medium text-sm">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div>Joined</div>
                  <div>Actions</div>
                </div>
                
                {mockRecentUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-6 gap-4 p-3 border rounded-lg items-center">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-600">{user.email}</div>
                    <div>
                      <Badge className={getRoleColor(user.role)}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </div>
                    <div className="text-gray-500">{user.joined}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reseller-orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reseller Order Management</CardTitle>
              <CardDescription>Review and approve reseller orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPendingResellerOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{order.reseller}</h3>
                        <p className="text-gray-600">Order #{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${order.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.items} items</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Requested Date</Label>
                        <p className="text-sm text-gray-600">{order.requested}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Badge variant="secondary">Pending Approval</Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button>Approve Order</Button>
                      <Button variant="outline">Request Changes</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Manage product catalog and inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search products..." />
                </div>
                <Button>Add New Product</Button>
              </div>
              
              <div className="text-center py-8 text-gray-500">
                <p>Product management interface will be implemented here</p>
                <p className="text-sm">Features: Add, edit, delete products, manage inventory, set pricing</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Configure platform settings and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Role Permissions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Employee Permissions</p>
                        <p className="text-sm text-gray-600">Manage product catalog and customer orders</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Reseller Approval Process</p>
                        <p className="text-sm text-gray-600">Configure reseller order approval workflow</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Platform Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Maintenance Mode</p>
                        <p className="text-sm text-gray-600">Temporarily disable the platform</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Debug Mode</p>
                        <p className="text-sm text-gray-600">Enable detailed logging</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </MainLayout>
  )
}
