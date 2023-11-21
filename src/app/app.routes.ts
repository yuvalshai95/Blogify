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
  {
    path: 'article/new',
    loadChildren: () => import('./create-article/create-article.routes').then((m) => m.createArticleRoutes),
  },
  // Note: pitfall in changing the order between the routes since :slug is dynamic and 'new' will be considered as slug instead of the actual route path
  {
    path: 'article/:slug',
    loadChildren: () => import('./article/article.routes').then((m) => m.articleRoutes),
  },
  {
    path: 'article/:slug/edit',
    loadChildren: () => import('./edit-article/edit-article.routes').then((m) => m.editArticleRoutes),
  },
];
