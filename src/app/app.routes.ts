import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./global-feed-main/global-feed.routes').then((m) => m.globalFeedRoutes),
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'feed',
    loadChildren: () => import('./your-feed-main/your-feed.routes').then((m) => m.yourFeedRoutes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () => import('./tag-feed-main/tag-feed.routes').then((m) => m.tagFeedRoutes),
  },
];
