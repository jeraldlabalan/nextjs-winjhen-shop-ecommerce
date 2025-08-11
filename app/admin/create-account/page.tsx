"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, Shield, UserPlus } from "lucide-react";

export default function CreateAccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "EMPLOYEE",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Check if user is authenticated and is admin
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    router.push("/auth/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "EMPLOYEE",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: ""
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (_err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Account
          </h1>
          <p className="text-gray-600 mt-2">
            Create employee or reseller accounts for your business
          </p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Account created successfully!
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-gray-700">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-gray-700">
                Account Type *
              </Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="RESELLER_CUSTOMER">Reseller Customer</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {formData.role === "EMPLOYEE" 
                  ? "Employees can add products but cannot delete anything"
                  : "Resellers can place bulk orders with special pricing"
                }
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1"
                placeholder="Phone number"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-700">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="mt-1"
                placeholder="Street address"
                required />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-gray-700">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="City"
                />
              </div>
              <div>
                <Label
                  htmlFor="state" className="text-gray-700">
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-gray-700">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="ZIP"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country" className="text-gray-700">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                className="mt-1"
                placeholder="Country"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password *
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
