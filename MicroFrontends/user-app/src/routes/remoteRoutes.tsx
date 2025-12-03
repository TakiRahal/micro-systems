import { createRoute } from '@tanstack/react-router';
import App from '../App';
import ListUsers from '../pages/list-users';
import DetailsUser from '../pages/details-user';
import ListGroups from '../pages/list-groups';
import Register from '../pages/register';
import Notification from '../pages/notification';
import Profile from '../pages/profile';

export const userRoutes = (parent: any) => {
  const layoutRoute = createRoute({
    getParentRoute: () => parent,
    path: 'user',
    component: App,
  })

  const homeRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/',
    component: ListUsers,
  })

  const listRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/list',
    component: ListUsers,
  })

  const detailsRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/details/$id',
    component: DetailsUser,
  })

  const profileRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/profile',
    component: Profile,
  })

  const registerRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/register',
    component: Register,
  })

  const notificationRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/notification',
    component: Notification,
  })

  const listGroupesRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/groupe/list',
    component: ListGroups,
  })

  return [layoutRoute.addChildren([homeRoute, listRoute, detailsRoute, 
    listGroupesRoute, registerRoute, notificationRoute, profileRoute])
  ]
}