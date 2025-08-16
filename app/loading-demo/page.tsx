"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner, LoadingSpinnerOverlay } from "@/components/ui/loading-spinner"
import { useLoading } from "@/lib/use-loading"
import { useNavigationLoading } from "@/lib/use-navigation-loading"
import { useAuthLoading } from "@/lib/use-auth-loading"

export default function LoadingDemoPage() {
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { navigateWithLoading } = useNavigationLoading()
  const { handleAuthWithLoading } = useAuthLoading()
  const [showOverlay, setShowOverlay] = useState(false)

  const handleManualLoading = () => {
    startLoading()
    setTimeout(() => stopLoading(), 3000)
  }

  const handleButtonLoading = () => {
    startLoading()
    setTimeout(() => stopLoading(), 2000)
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

  const handleOverlayLoading = () => {
    setShowOverlay(true)
    setTimeout(() => setShowOverlay(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Loading Components Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test all the loading features available in your application
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

          {/* Global Loading States */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Global Loading States
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              All loading states now use the top progress bar for consistency
            </p>
            <div className="space-y-4">
              <Button 
                onClick={handleButtonLoading}
                className="w-full"
                variant="default"
              >
                Start Global Loading (2s)
              </Button>
              
              <Button 
                onClick={() => {
                  startLoading();
                  setTimeout(() => stopLoading(), 1500);
                }}
                className="w-full"
                variant="outline"
              >
                Quick Loading (1.5s)
              </Button>
              
              <Button 
                onClick={() => {
                  startLoading();
                  setTimeout(() => stopLoading(), 3000);
                }}
                className="w-full"
                variant="destructive"
              >
                Long Loading (3s)
              </Button>
            </div>
          </div>

           {/* Navigation Loading */}
           <div className="bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
               Navigation Loading
             </h2>
             <p className="text-sm text-gray-600 mb-4">
               Sidebar navigation now uses the top progress bar
             </p>
             <div className="space-y-4">
               <Button 
                 onClick={() => navigateWithLoading("/")}
                 className="w-full"
                 variant="default"
               >
                 Go to Home
               </Button>
               
               <Button 
                 onClick={() => navigateWithLoading("/dashboard")}
                 className="w-full"
                 variant="outline"
               >
                 Go to Dashboard
               </Button>
               
               <Button 
                 onClick={() => navigateWithLoading("/reseller/catalog")}
                 className="w-full"
                 variant="secondary"
               >
                 Go to Catalog
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

          {/* Loading Spinner Components */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Loading Spinner Components
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Small:</span>
                <LoadingSpinner size="sm" color="blue" />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Medium:</span>
                <LoadingSpinner size="md" color="green" />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Large:</span>
                <LoadingSpinner size="lg" color="purple" />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Extra Large:</span>
                <LoadingSpinner size="xl" color="orange" />
              </div>
            </div>
          </div>

          {/* Overlay Loading */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Overlay Loading
            </h2>
            <div className="space-y-4">
              <Button 
                onClick={handleOverlayLoading}
                className="w-full"
                variant="outline"
              >
                Show Overlay (3s)
              </Button>
              
              <p className="text-sm text-gray-600">
                This will show a loading overlay that covers the entire page
              </p>
            </div>
          </div>
        </div>

        {/* Full Screen Loading Demo */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Full Screen Loading Demo
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              onClick={() => {
                startLoading()
                setTimeout(() => stopLoading(), 2000)
              }}
              className="w-full"
              variant="default"
            >
              Blue Progress Bar
            </Button>
            
            <Button 
              onClick={() => {
                startLoading()
                setTimeout(() => stopLoading(), 2000)
              }}
              className="w-full"
              variant="outline"
            >
              Orange Progress Bar
            </Button>
            
            <Button 
              onClick={() => {
                startLoading()
                setTimeout(() => stopLoading(), 2000)
              }}
              className="w-full"
              variant="secondary"
            >
              Green Progress Bar
            </Button>
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

      {/* Loading Overlay */}
      {showOverlay && (
        <LoadingSpinnerOverlay 
          text="Processing your request..."
          color="orange"
        />
      )}
    </div>
  )
}
