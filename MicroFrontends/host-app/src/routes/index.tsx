import { createRootRoute, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtoolsInProd } from '@tanstack/react-router-devtools';
import Login from '../components/templates/login/components/login';
import MainContainer from '../components/templates/main/components/main-container';
import Dashboard from '../components/templates/dashboard/components/dashboard';
import Register from '../components/templates/register/components/register';


// ✅ The root of all route trees
const rootRoute = createRootRoute({
  component: () => 
    <>
      <Outlet />
      <TanStackRouterDevtoolsInProd /> 
    </>
})

async function loadRemoteRoutes() {
  const routes: any[] = []

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Login,
    beforeLoad: async () => {
      if ( localStorage.getItem('isAuthenticated') ) {
        throw redirect({
          to: '/main/user',
        })
      }
    },
  })
  routes.push(loginRoute)

  const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: Register,
  })
  routes.push(registerRoute)

  const mainRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/main',
    component: MainContainer
  })
  routes.push(mainRoute)

  const dashboardRoute = createRoute({
    getParentRoute: () => mainRoute,
    path: '/dashboard',
    component: Dashboard,
  })
  routes.push(dashboardRoute)

  // Load routes from UserApp
  const UserApp = await import('UserApp/remoteRoutes')
  
  if (UserApp.default?.userRoutes) {
    routes.push(...UserApp.default?.userRoutes(mainRoute))
  }

  // Load routes from OfferApp
  const OfferApp = await import('OfferApp/remoteRoutes')
  if (OfferApp.default?.offerRoutes) {
    routes.push(...OfferApp.default?.offerRoutes(mainRoute))
  }

  return routes
}

export async function buildRouter() {
  const routes = await loadRemoteRoutes()
  const routeTree = rootRoute.addChildren(routes)

  return createRouter({
    routeTree,
  })
}