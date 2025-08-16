import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLoading } from "./use-loading"

export function useSidebarNavigation() {
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()

  const navigateWithLoading = useCallback(async (href: string) => {
    startLoading()
    
    try {
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300))
      router.push(href)
    } finally {
      // Stop loading after navigation starts
      setTimeout(() => stopLoading(), 100)
    }
  }, [router, startLoading, stopLoading])

  return {
    navigateWithLoading
  }
}
