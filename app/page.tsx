"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header for landing page */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Winjhen Shop</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {session ? (
                <Link href="/dashboard">
                  <Button size="sm">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button size="sm">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="outline" size="sm">Create Account</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to{" "}
              <span className="text-blue-600">Winjhen Shop</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Professional e-commerce platform for retail and wholesale business. 
              Quality products, competitive prices, and exceptional service.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              {session ? (
                <Link href="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button size="lg">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="outline" size="lg">Create Account</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Winjhen Shop?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive e-commerce solutions for all types of users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛍️</span>
                </div>
                <CardTitle>Retail Customers</CardTitle>
                <CardDescription>
                  Shop with confidence with our wide selection of quality products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Secure online shopping</li>
                  <li>• Fast delivery options</li>
                  <li>• Easy returns & exchanges</li>
                  <li>• Loyalty rewards program</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <CardTitle>Reseller Customers</CardTitle>
                <CardDescription>
                  Bulk purchasing with special wholesale pricing and credit terms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Wholesale pricing</li>
                  <li>• Credit payment terms</li>
                  <li>• Bulk order discounts</li>
                  <li>• Business analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <CardTitle>Employees</CardTitle>
                <CardDescription>
                  Manage products, inventory, and customer orders efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Product management</li>
                  <li>• Order processing</li>
                  <li>• Inventory tracking</li>
                  <li>• Customer support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Administrators</CardTitle>
                <CardDescription>
                  Full platform control with comprehensive management tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• User management</li>
                  <li>• System configuration</li>
                  <li>• Performance analytics</li>
                  <li>• Security controls</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Loading Demo Section */}
      <div className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              🚀 Try Our Loading Features
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Experience the smooth loading states and progress indicators
            </p>
          </div>
          <div className="text-center">
            <Link href="/loading-demo">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                🚀 Try Loading Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of satisfied customers and businesses
            </p>
            <div className="mt-8 flex justify-center gap-4">
              {session ? (
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signup">
                    <Button size="lg" variant="secondary">Create Account</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button size="lg" variant="outline" className="text-blue-600 bg-white hover:bg-gray-50">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Winjhen Shop</h3>
              <p className="text-gray-400 text-sm">
                Professional e-commerce platform for retail and wholesale business.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Shop Products</li>
                <li>Track Orders</li>
                <li>Returns & Exchanges</li>
                <li>Customer Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Wholesale Pricing</li>
                <li>Bulk Orders</li>
                <li>Credit Terms</li>
                <li>Business Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Winjhen Shop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
