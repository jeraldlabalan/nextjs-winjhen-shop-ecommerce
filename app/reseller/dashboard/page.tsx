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
import { LoadingSpinnerFullScreen } from "@/components/ui/loading-spinner"
import { useLoading } from "@/lib/use-loading"

export default function ResellerDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const { startLoading, stopLoading } = useLoading()

  if (status === "loading") {
    return (
      <LoadingSpinnerFullScreen 
        text="Loading dashboard..."
        color="orange"
      />
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  const user = session?.user

  if (!user || user.role !== "RESELLER_CUSTOMER") {
    redirect("/dashboard")
  }

  // Mock data for reseller customers
  const mockStats = {
    totalOrders: 15,
    totalSpent: 12500.50,
    pendingOrders: 3,
    creditLimit: 25000.00,
    availableCredit: 12500.00
  }

  const mockPendingOrders = [
    { id: "1", orderNumber: "RES-001", date: "2024-01-15", status: "Pending Approval", total: 1250.00, items: 15 },
    { id: "2", orderNumber: "RES-002", date: "2024-01-12", status: "Pending Approval", total: 890.50, items: 8 },
    { id: "3", orderNumber: "RES-003", date: "2024-01-10", status: "Pending Approval", total: 2100.00, items: 22 }
  ]

  const mockApprovedOrders = [
    { id: "4", orderNumber: "RES-004", date: "2024-01-08", status: "Confirmed", total: 750.00, items: 6, paymentDue: "2024-02-08" },
    { id: "5", orderNumber: "RES-005", date: "2024-01-05", status: "Shipped", total: 1200.00, items: 12, paymentDue: "2024-02-05" }
  ]

  const mockPaymentHistory = [
    { id: "1", orderNumber: "RES-006", amount: 500.00, date: "2024-01-15", method: "Bank Transfer", status: "Completed" },
    { id: "2", orderNumber: "RES-007", amount: 750.00, date: "2024-01-10", method: "Bank Transfer", status: "Completed" },
    { id: "3", orderNumber: "RES-008", amount: 1200.00, date: "2024-01-05", method: "Bank Transfer", status: "Completed" }
  ]

  const mockProductCatalog = [
    { id: "1", name: "Wireless Headphones", retailPrice: 129.99, resellerPrice: 89.99, stock: 45, minOrder: 5 },
    { id: "2", name: "Smart Watch", retailPrice: 299.99, resellerPrice: 199.99, stock: 23, minOrder: 3 },
    { id: "3", name: "Laptop Stand", retailPrice: 49.99, resellerPrice: 29.99, stock: 67, minOrder: 10 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Confirmed":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleNavigateToCatalog = async () => {
    startLoading();
    try {
      // Simulate navigation delay
      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.href = '/reseller/catalog';
    } finally {
      stopLoading();
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reseller Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.firstName}! Manage your business orders and payments</p>
          </div>
                     <Button
             onClick={handleNavigateToCatalog}
             className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
           >
             Browse Product Catalog
           </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
            <div className="text-2xl font-bold">${mockStats.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime spending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Limit</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.creditLimit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total credit limit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${mockStats.availableCredit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Credit available</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>Orders awaiting admin approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
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
                        <Button size="sm" variant="outline" className="mt-2">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Pending Orders</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your latest payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPaymentHistory.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{payment.orderNumber}</p>
                        <p className="text-sm text-gray-600">{payment.date} • {payment.method}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPaymentStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${payment.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Payments</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage all your reseller orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search orders..." />
                </div>
                <Button>Place New Order</Button>
                <Button variant="outline">Filter by Status</Button>
              </div>
              
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                  <TabsTrigger value="approved">Approved Orders</TabsTrigger>
                  <TabsTrigger value="completed">Completed Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-4">
                  <div className="space-y-4">
                    {mockPendingOrders.map((order) => (
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
                          <Button variant="outline">View Details</Button>
                          <Button variant="outline">Cancel Order</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="approved" className="mt-4">
                  <div className="space-y-4">
                    {mockApprovedOrders.map((order) => (
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
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <Label>Status</Label>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <div>
                            <Label>Payment Due</Label>
                            <p className="text-sm text-gray-600">{order.paymentDue}</p>
                          </div>
                          <div>
                            <Label>Items</Label>
                            <p className="text-sm text-gray-600">{order.items} products</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button>Make Payment</Button>
                          <Button variant="outline">View Details</Button>
                          <Button variant="outline">Track Package</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                  <div className="text-center py-8 text-gray-500">
                    <p>No completed orders yet</p>
                    <p className="text-sm">Completed orders will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>Track your payment history and manage outstanding balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search payments..." />
                </div>
                <Button>Make Payment</Button>
                <Button variant="outline">Export History</Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 p-3 bg-gray-100 rounded-lg font-medium text-sm">
                  <div>Order Number</div>
                  <div>Amount</div>
                  <div>Date</div>
                  <div>Method</div>
                  <div>Status</div>
                </div>
                
                {mockPaymentHistory.map((payment) => (
                  <div key={payment.id} className="grid grid-cols-5 gap-4 p-3 border rounded-lg items-center">
                    <div className="font-medium">{payment.orderNumber}</div>
                    <div className="font-medium">${payment.amount.toFixed(2)}</div>
                    <div className="text-gray-600">{payment.date}</div>
                    <div className="text-gray-600">{payment.method}</div>
                    <div>
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="catalog" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Browse products available for resale with special pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search products..." />
                </div>
                <Button variant="outline">Filter by Category</Button>
                <Button variant="outline">Export Catalog</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProductCatalog.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Product Image</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retail Price:</span>
                        <span className="text-sm line-through">${product.retailPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reseller Price:</span>
                        <span className="text-lg font-bold text-green-600">${product.resellerPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Stock:</span>
                        <span className="text-sm">{product.stock} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Min Order:</span>
                        <span className="text-sm">{product.minOrder} units</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Add to Order</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>Track your business performance and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Analytics dashboard will be implemented here</p>
                <p className="text-sm">Features: Sales trends, order volume, payment patterns, profit margins</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reseller Settings</CardTitle>
              <CardDescription>Manage your business account and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Business Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Business Name</p>
                        <p className="text-sm text-gray-600">Your registered business name</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Tax ID</p>
                        <p className="text-sm text-gray-600">Business tax identification number</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Order Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-approval for small orders</p>
                        <p className="text-sm text-gray-600">Automatically approve orders under $500</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bulk order notifications</p>
                        <p className="text-sm text-gray-600">Receive alerts for large quantity orders</p>
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
