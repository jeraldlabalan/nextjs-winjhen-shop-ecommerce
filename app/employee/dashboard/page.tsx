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

import MainLayout from "@/components/layout/main-layout"

export default function EmployeeDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  const user = session?.user

  if (!user || user.role !== "EMPLOYEE") {
    redirect("/dashboard")
  }

  // Mock data - replace with actual data from your API
  const mockStats = {
    totalProducts: 156,
    lowStockProducts: 8,
    pendingOrders: 23,
    todayOrders: 12
  }

  const mockLowStockProducts = [
    { id: "1", name: "Wireless Headphones", sku: "WH-001", currentStock: 3, minStock: 10 },
    { id: "2", name: "USB-C Cable", sku: "UC-002", currentStock: 5, minStock: 15 },
    { id: "3", name: "Bluetooth Speaker", sku: "BS-003", currentStock: 2, minStock: 8 }
  ]

  const mockPendingOrders = [
    { id: "1", customer: "John Doe", amount: 89.99, items: 2, status: "Processing", priority: "High" },
    { id: "2", customer: "Jane Smith", amount: 156.50, items: 3, status: "Confirmed", priority: "Medium" },
    { id: "3", customer: "Bob Johnson", amount: 45.00, items: 1, status: "Processing", priority: "Low" }
  ]

  const mockRecentProducts = [
    { id: "1", name: "Smartphone Case", category: "Accessories", price: 19.99, stock: 45, sku: "SC-001" },
    { id: "2", name: "Laptop Stand", category: "Accessories", price: 29.99, stock: 23, sku: "LS-002" },
    { id: "3", name: "Wireless Mouse", category: "Peripherals", price: 24.99, stock: 67, sku: "WM-003" }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.firstName}! Manage products and customer orders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Active products in catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockStats.lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Products need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Orders to process</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Orders</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.todayOrders}</div>
            <p className="text-xs text-muted-foreground">Orders received today</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Stock Products */}
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Products that need immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                        <p className="text-sm text-red-600">
                          Stock: {product.currentStock} / Min: {product.minStock}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">Restock</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Low Stock</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders to process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">${order.amount.toFixed(2)} • {order.items} items</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">Process</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Orders</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Manage product catalog and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search products..." />
                </div>
                <Button>Add New Product</Button>
                <Button variant="outline">Export</Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 p-3 bg-gray-100 rounded-lg font-medium text-sm">
                  <div>Product Name</div>
                  <div>Category</div>
                  <div>SKU</div>
                  <div>Price</div>
                  <div>Stock</div>
                </div>
                
                {mockRecentProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-5 gap-4 p-3 border rounded-lg items-center">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-gray-600">{product.category}</div>
                    <div className="text-gray-600">{product.sku}</div>
                    <div className="font-medium">${product.price}</div>
                    <div className="flex items-center gap-2">
                      <span className={product.stock < 20 ? "text-red-600 font-medium" : ""}>
                        {product.stock}
                      </span>
                      {product.stock < 20 && (
                        <Badge variant="secondary" className="text-xs">Low Stock</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Process and manage customer orders</CardDescription>
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
                {mockPendingOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                        <p className="text-gray-600">Customer: {order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${order.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.items} items</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label>Status</Label>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </div>
                      <div>
                        <Label>Items</Label>
                        <p className="text-sm text-gray-600">{order.items} products</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button>Process Order</Button>
                      <Button variant="outline">View Details</Button>
                      <Button variant="outline">Update Status</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Support</CardTitle>
              <CardDescription>Manage customer inquiries and support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Customer support interface will be implemented here</p>
                <p className="text-sm">Features: View customer profiles, handle support tickets, manage returns</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Monitor stock levels and manage inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search inventory..." />
                </div>
                <Button>Update Stock</Button>
                <Button variant="outline">Generate Report</Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 p-3 bg-gray-100 rounded-lg font-medium text-sm">
                  <div>Product</div>
                  <div>Current Stock</div>
                  <div>Min Stock Level</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                
                {mockLowStockProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-5 gap-4 p-3 border rounded-lg items-center">
                    <div className="font-medium">{product.name}</div>
                    <div className={product.currentStock < product.minStock ? "text-red-600 font-medium" : ""}>
                      {product.currentStock}
                    </div>
                    <div>{product.minStock}</div>
                    <div>
                      {product.currentStock < product.minStock ? (
                        <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Update</Button>
                      <Button size="sm" variant="outline">History</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </MainLayout>
  )
}
