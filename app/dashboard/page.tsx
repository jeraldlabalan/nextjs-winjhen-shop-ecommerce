"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, User, Shield, ShoppingBag, Users } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "ADMIN":
        return { label: "Administrator", icon: Shield, color: "text-red-600" };
      case "EMPLOYEE":
        return { label: "Employee", icon: User, color: "text-blue-600" };
      case "RETAIL_CUSTOMER":
        return { label: "Retail Customer", icon: ShoppingBag, color: "text-green-600" };
      case "RESELLER_CUSTOMER":
        return { label: "Reseller Customer", icon: Users, color: "text-purple-600" };
      default:
        return { label: "User", icon: User, color: "text-gray-600" };
    }
  };

  const roleInfo = getRoleDisplay(session?.user?.role || "");
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Winjhen Shop</h1>
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
                <div className={`p-2 rounded-lg bg-gray-100 ${roleInfo.color}`}>
                  <RoleIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {roleInfo.label} Dashboard
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage your account and view your information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Account Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">
                        {session?.user?.firstName} {session?.user?.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{session?.user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Role:</span>
                      <span className="font-medium">{roleInfo.label}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    {session?.user?.role === "ADMIN" && (
                      <Button className="w-full justify-start" variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                    )}
                    {session?.user?.role === "EMPLOYEE" && (
                      <Button className="w-full justify-start" variant="outline">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Manage Products
                      </Button>
                    )}
                    {(session?.user?.role === "RETAIL_CUSTOMER" || session?.user?.role === "RESELLER_CUSTOMER") && (
                      <Button className="w-full justify-start" variant="outline">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        View Products
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  This is a basic dashboard. More features will be added based on your role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
