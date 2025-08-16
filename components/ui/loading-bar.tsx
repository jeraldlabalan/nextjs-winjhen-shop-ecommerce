"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingBarProps {
  isLoading?: boolean
  className?: string
  color?: "blue" | "green" | "purple" | "orange"
}

const LoadingBar = React.forwardRef<HTMLDivElement, LoadingBarProps>(
  ({ isLoading = false, className, color = "blue" }, ref) => {
    const [progress, setProgress] = React.useState(0)
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
      if (isLoading) {
        setIsVisible(true)
        setProgress(0)
        
        // Simulate progress
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(interval)
              return 90
            }
            return prev + Math.random() * 15
          })
        }, 100)

        return () => clearInterval(interval)
      } else {
        // Complete the progress bar
        setProgress(100)
        const timer = setTimeout(() => {
          setIsVisible(false)
          setProgress(0)
        }, 300)
        
        return () => clearTimeout(timer)
      }
    }, [isLoading])

    const colorClasses = {
      blue: "bg-blue-500",
      green: "bg-green-500", 
      purple: "bg-purple-500",
      orange: "bg-orange-500"
    }

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(
          "fixed top-0 left-0 w-full h-1 z-50 bg-gray-100",
          className
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out",
            colorClasses[color]
          )}
          style={{
            width: `${progress}%`,
            transition: progress === 100 ? "width 0.3s ease-out" : "width 0.1s ease-out"
          }}
        />
      </div>
    )
  }
)

LoadingBar.displayName = "LoadingBar"

export { LoadingBar }
