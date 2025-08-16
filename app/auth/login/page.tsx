"use client";

import { useState, useEffect } from "react";
import { signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthLoading } from "@/lib/use-auth-loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { handleAuthWithLoading } = useAuthLoading();
  const { status } = useSession();

  // Reset form state when session changes (e.g., after logout)
  useEffect(() => {
    if (status === "unauthenticated") {
      setEmail("");
      setPassword("");
      setError("");
      setIsSubmitting(false);
    }
  }, [status]);

  // Check if form is valid (both fields have content)
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError("");

    await handleAuthWithLoading(
      async () => {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
          throw new Error("Invalid credentials");
        }

        // Get session to check user role
        const session = await getSession();
        if (session?.user) {
          const role = session.user.role;
          
          // Redirect based on role
          switch (role) {
            case "ADMIN":
              router.push("/admin/dashboard");
              break;
            case "EMPLOYEE":
              router.push("/employee/dashboard");
              break;
            case "RETAIL_CUSTOMER":
              router.push("/dashboard");
              break;
            case "RESELLER_CUSTOMER":
              router.push("/reseller/catalog");
              break;
            default:
              router.push("/dashboard");
          }
        }
      },
      undefined,
      (error) => {
        if (error.message !== "Invalid credentials") {
          setError("An error occurred. Please try again.");
        }
      }
    ).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-[var(--color-primary-pink)] rounded-lg flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to Winjhen Shop
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">

            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className=""
                />
              {/* <div className="relative mt-1">
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[var(--color-primary-pink)]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[var(--color-primary-pink)]" />
                  )}
                </button>
              </div> */}
            </div>
            
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-link"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="auth"
              disabled={!isFormValid || isSubmitting}
              className="w-full flex justify-center py-2 px-4"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-link"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
