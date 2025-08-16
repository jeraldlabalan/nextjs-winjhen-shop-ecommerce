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

export default function CustomerDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  const user = session?.user

  if (!user) {
    redirect("/auth/login")
  }

  // Redirect based on role
  if (user.role === "ADMIN") {
    redirect("/admin/dashboard")
  }

  if (user.role === "EMPLOYEE") {
    redirect("/employee/dashboard")
  }

  if (user.role === "RESELLER_CUSTOMER") {
    redirect("/reseller/dashboard")
  }

  // Mock data for retail customers
  const mockStats = {
    totalOrders: 8,
    totalSpent: 456.78,
    loyaltyPoints: 1250,
    savedAddresses: 2
  }

  const mockRecentOrders = [
    { id: "1", orderNumber: "ORD-001", date: "2024-01-15", status: "Delivered", total: 89.99, items: 2 },
    { id: "2", orderNumber: "ORD-002", date: "2024-01-10", status: "Shipped", total: 156.50, items: 3 },
    { id: "3", orderNumber: "ORD-003", date: "2024-01-05", status: "Processing", total: 45.00, items: 1 }
  ]

  const mockWishlist = [
    { id: "1", name: "Wireless Headphones", price: 129.99, image: "/placeholder.jpg" },
    { id: "2", name: "Smart Watch", price: 299.99, image: "/placeholder.jpg" },
    { id: "3", name: "Laptop Stand", price: 49.99, image: "/placeholder.jpg" }
  ]

  const mockSavedAddresses = [
    { id: "1", name: "Home", address: "123 Main St", city: "New York", state: "NY", zip: "10001", isDefault: true },
    { id: "2", name: "Office", address: "456 Business Ave", city: "New York", state: "NY", zip: "10002", isDefault: false }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.firstName}! Manage your orders and preferences</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Orders placed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime spending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.loyaltyPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Addresses</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.savedAddresses}</div>
            <p className="text-xs text-muted-foreground">Addresses saved</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                        <Button size="sm" variant="outline" className="mt-2">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Orders</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Start Shopping
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Track Package
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    View Wishlist
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Manage Addresses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track all your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search orders..." />
                </div>
                <Button variant="outline">Filter by Status</Button>
                <Button variant="outline">Export Orders</Button>
              </div>
              
              <div className="space-y-4">
                {mockRecentOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                        <p className="text-gray-600">Placed on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.items} items</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Status</Label>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div>
                        <Label>Items</Label>
                        <p className="text-sm text-gray-600">{order.items} products</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button>View Details</Button>
                      <Button variant="outline">Track Package</Button>
                      <Button variant="outline">Reorder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
              <CardDescription>Products you&apos;ve saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWishlist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Image</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-green-600 mb-4">${item.price}</p>
                    <div className="flex gap-2">
                      <Button className="flex-1">Add to Cart</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {mockWishlist.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Your wishlist is empty</p>
                  <p className="text-sm">Start shopping to add items to your wishlist</p>
                  <Button className="mt-4">Start Shopping</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Manage your shipping addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>Add New Address</Button>
              </div>
              
              <div className="space-y-4">
                {mockSavedAddresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{address.name}</h3>
                          {address.isDefault && (
                            <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{address.address}</p>
                        <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-600">Receive notifications about order status</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Offers</p>
                        <p className="text-sm text-gray-600">Receive special deals and discounts</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-gray-600">Receive our monthly newsletter</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Privacy Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-gray-600">Allow other users to see your profile</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order History</p>
                        <p className="text-sm text-gray-600">Share order history for support</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
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
