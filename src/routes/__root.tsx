import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { MainLayout } from '@/layouts/MainLayout'
import { QueryProvider } from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <ThemeProvider defaultTheme='system' enableSystem>
        <QueryProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </QueryProvider>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  )
}
