"use client"

import { useRouter } from "next/navigation"
import { useLoading } from "./use-loading"
import { useCallback } from "react"

export function useNavigationLoading() {
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()

  const navigateWithLoading = useCallback((href: string) => {
    startLoading()
    
    // Simulate navigation delay
    setTimeout(() => {
      router.push(href)
      stopLoading()
    }, 500)
  }, [router, startLoading, stopLoading])

  const navigateWithLoadingAsync = useCallback(async (href: string, delay: number = 500) => {
    startLoading()
    
    try {
      await new Promise(resolve => setTimeout(resolve, delay))
      router.push(href)
    } finally {
      stopLoading()
    }
  }, [router, startLoading, stopLoading])

  return {
    navigateWithLoading,
    navigateWithLoadingAsync
  }
}
