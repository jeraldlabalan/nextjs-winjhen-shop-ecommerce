"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLoading } from "@/lib/use-loading"
import { useNavigationLoading } from "@/lib/use-navigation-loading"
import { useAuthLoading } from "@/lib/use-auth-loading"

export default function LoadingDemoPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { navigateWithLoading } = useNavigationLoading()
  const { handleAuthWithLoading } = useAuthLoading()
  const [buttonLoading, setButtonLoading] = useState(false)

  const handleManualLoading = () => {
    startLoading()
    setTimeout(() => stopLoading(), 3000)
  }

  const handleButtonLoading = () => {
    setButtonLoading(true)
    setTimeout(() => setButtonLoading(false), 2000)
  }

  const handleSimulatedAuth = async () => {
    await handleAuthWithLoading(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log("Auth completed!")
      },
      () => console.log("Success!"),
      (error) => console.error("Error:", error)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loading Components Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test the top progress bar and button loading states
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Progress Bar Controls */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Top Progress Bar
            </h2>
            <div className="space-y-4">
              <Button 
                onClick={handleManualLoading}
                className="w-full"
                variant="default"
              >
                Start 3s Loading
              </Button>
              
              <Button 
                onClick={() => startLoading()}
                className="w-full"
                variant="outline"
              >
                Start Loading (Manual Stop)
              </Button>
              
              <Button 
                onClick={() => stopLoading()}
                className="w-full"
                variant="secondary"
              >
                Stop Loading
              </Button>
              
              <div className="text-sm text-gray-600">
                Current state: {isLoading ? "Loading..." : "Idle"}
              </div>
            </div>
          </div>

          {/* Button Loading States */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Button Loading States
            </h2>
            <div className="space-y-4">
              <Button 
                loading={buttonLoading}
                loadingText="Processing..."
                className="w-full"
                variant="default"
                onClick={handleButtonLoading}
              >
                Click to Load
              </Button>
              
              <Button 
                loading={buttonLoading}
                className="w-full"
                variant="auth"
                onClick={handleButtonLoading}
              >
                Auth Button
              </Button>
              
              <Button 
                loading={buttonLoading}
                className="w-full"
                variant="outline"
                onClick={handleButtonLoading}
              >
                Outline Button
              </Button>
            </div>
          </div>

          {/* Navigation Loading */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Navigation Loading
            </h2>
            <div className="space-y-4">
              <Button 
                onClick={() => navigateWithLoading("/")}
                className="w-full"
                variant="default"
              >
                Go to Home
              </Button>
              
              <Button 
                onClick={() => navigateWithLoading("/auth/login")}
                className="w-full"
                variant="auth"
              >
                Go to Login
              </Button>
              
              <Button 
                onClick={() => navigateWithLoading("/auth/signup")}
                className="w-full"
                variant="outline"
              >
                Go to Signup
              </Button>
            </div>
          </div>

          {/* Auth Loading */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Auth Loading
            </h2>
            <div className="space-y-4">
              <Button 
                onClick={handleSimulatedAuth}
                className="w-full"
                variant="auth"
              >
                Simulate Auth (2s)
              </Button>
              
              <Button 
                onClick={() => handleAuthWithLoading(
                  async () => {
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    throw new Error("Simulated error")
                  },
                  undefined,
                  (error) => alert(`Error: ${error.message}`)
                )}
                className="w-full"
                variant="destructive"
              >
                Simulate Auth Error
              </Button>
            </div>
          </div>
        </div>

        {/* Color Options */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Progress Bar Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["blue", "green", "purple", "orange"].map((color) => (
              <Button
                key={color}
                onClick={() => {
                  startLoading()
                  setTimeout(() => stopLoading(), 2000)
                }}
                className="w-full capitalize"
                variant="outline"
              >
                {color} Progress
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigateWithLoading("/")}
            variant="default"
            size="lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
