"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Shield, UserPlus, ShoppingBag, Users, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (session?.user?.role && session.user.role !== "ADMIN")) {
      router.push("/auth/login");
    }
  }, [status, session?.user?.role, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="text-sm font-medium text-gray-900">
                  {session?.user?.firstName} {session?.user?.lastName}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-red-100 text-red-600">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Administrator Dashboard
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage your e-commerce platform and users
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin/create-account">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <UserPlus className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-medium text-blue-900">Create Accounts</h3>
                        <p className="text-sm text-blue-700">Add employees and resellers</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-green-900">User Management</h3>
                      <p className="text-sm text-green-700">View and manage all users</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <div className="flex items-center">
                    <ShoppingBag className="h-8 w-8 text-purple-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-purple-900">Product Management</h3>
                      <p className="text-sm text-purple-700">Manage inventory and products</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center">
                    <BarChart3 className="h-8 w-8 text-orange-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-orange-900">Analytics</h3>
                      <p className="text-sm text-orange-700">View sales and performance data</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Admin dashboard features will be expanded based on your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
