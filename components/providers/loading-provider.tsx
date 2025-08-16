"use client"

import { LoadingBar } from "@/components/ui/loading-bar"
import { useLoading } from "@/lib/use-loading"

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading()

  return (
    <>
      <LoadingBar isLoading={isLoading} color="blue" />
      {children}
    </>
  )
}
