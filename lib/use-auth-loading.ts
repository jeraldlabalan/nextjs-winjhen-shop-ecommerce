"use client"

import { useLoading } from "./use-loading"
import { useCallback } from "react"

export function useAuthLoading() {
  const { startLoading, stopLoading } = useLoading()

  const handleAuthWithLoading = useCallback(async (
    authFunction: () => Promise<any>,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) => {
    startLoading()
    
    try {
      const result = await authFunction()
      if (onSuccess) onSuccess()
      return result
    } catch (error) {
      if (onError) onError(error)
      throw error
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  return {
    handleAuthWithLoading
  }
}
