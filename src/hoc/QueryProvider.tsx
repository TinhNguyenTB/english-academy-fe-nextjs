'use client'

import { queryClient } from '@/config/tanstackQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  // Server: always make a new query client for each request to prevent data leakage between users.
  if (typeof window === 'undefined') {
    return queryClient
  } else {
    // Browser: make a new query client if we don't already have one.
    // This is important for preventing re-making the client if React suspends during initial render.
    if (!browserQueryClient) {
      browserQueryClient = queryClient
    }
    return browserQueryClient
  }
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
