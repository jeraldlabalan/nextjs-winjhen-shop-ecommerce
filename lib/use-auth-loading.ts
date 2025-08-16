"use client"

import { useLoading } from "./use-loading"
import { useCallback } from "react"

export function useAuthLoading() {
  const { startLoading, stopLoading } = useLoading()

  const handleAuthWithLoading = useCallback(async <T>(
    authFunction: () => Promise<T>,
    onSuccess?: () => void,
    onError?: (error: Error) => void
  ) => {
    startLoading()
    
    try {
      const result = await authFunction()
      if (onSuccess) onSuccess()
      return result
    } catch (error) {
      if (onError) onError(error instanceof Error ? error : new Error(String(error)))
      throw error
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  return {
    handleAuthWithLoading
  }
}
