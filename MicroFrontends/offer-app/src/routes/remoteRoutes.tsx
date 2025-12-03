import { createRoute } from "@tanstack/react-router"
import ListOffers from "../pages/list-offers"
import App from "../App"
import AddUpdateOffer from "../pages/add-update-offer"

function App2Home() {
  return <h3>Welcome to App2 Home</h3>
}

export const offerRoutes = (parent: any) => {
  const layoutRoute = createRoute({
    getParentRoute: () => parent,
    path: 'offer',
    component: App,
  })

  const homeRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/',
    component: App2Home,
  })

  const listRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/list',
    component: ListOffers,
  })

  const addRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/add',
    component: AddUpdateOffer,
  })

  const updateRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/update/$id',
    component: AddUpdateOffer,
  })

  return [layoutRoute.addChildren([homeRoute, listRoute, addRoute, updateRoute])]
}