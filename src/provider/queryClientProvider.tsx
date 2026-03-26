'use client'


import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
const queryClient = new QueryClient()

export default function QueryClientProvider({ children }: { children: ReactNode }) {
  return <Provider client={queryClient}>
    <ReactQueryStreamedHydration>
      {children}
    </ReactQueryStreamedHydration>
  </Provider>
}