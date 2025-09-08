import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { queryClient } from '@/lib/queryClient'

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </NextThemesProvider>
    </QueryClientProvider>
  )
}

// Re-export for backward compatibility if needed
export function QueryProvider({ children }: Props) {
  return <AppProvider>{children}</AppProvider>
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
