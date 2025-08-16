"use client"

import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  startLoading: () => void
  stopLoading: () => void
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}))
