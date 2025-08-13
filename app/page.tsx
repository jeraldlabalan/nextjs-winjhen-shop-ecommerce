import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-[var(--color-primary-pink)] rounded-lg flex items-center justify-center mr-3">
                <svg className="h-6 w-6 bg-[var(--color-primary-pink)] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className=" text-2xl font-bold text-gray-900">Winjhen Shop</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button className="pink-button">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="hover-soft-border">Get Started</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional E-commerce
              <span className="text-[var(--color-primary-pink)]"> Platform</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive solution for retail and wholesale business with role-based access control, 
              inventory management, and flexible payment options for resellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-3 hover-soft-border">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" className="text-lg px-8 py-3 pink-button">
                  Access Account
                </Button>
              </Link>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Platform Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Role-Based Access</h4>
                <p className="text-gray-600">
                  Secure access control for admins, employees, retail customers, and resellers.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Inventory Management</h4>
                <p className="text-gray-600">
                  Comprehensive product management with stock tracking and pricing controls.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Flexible Payments</h4>
                <p className="text-gray-600">
                  Support for immediate payments and deferred payment options for resellers.
                </p>
              </div>
            </div>
          </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Winjhen Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
