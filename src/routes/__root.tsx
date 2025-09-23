import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { MainLayout } from '@/layouts/MainLayout'
import { AppProvider } from '@/providers/AppProvider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <AppProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </AppProvider>
      <TanStackRouterDevtools />
    </>
  )
}
