
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()  => import('./playlist.component')
  },
  {
    path: 'detail',
    loadComponent: () => import('./pages/playlist-detail/playlist-detail.component')
  }
];

export default routes;