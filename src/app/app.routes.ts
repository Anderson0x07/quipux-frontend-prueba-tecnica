import { Routes } from '@angular/router';
import { AutenticacionGuard } from './auth-guard/autentication.guard';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'login',
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        canActivate: [AutenticacionGuard], 
        loadComponent: () => import('./features/login/login.component') 
    },
    {
        path: 'register', 
        canActivate: [AutenticacionGuard], 
        loadComponent: () => import('./features/register/register.component') 
    },
    { 
        path: 'admin',
        canActivate: [AutenticacionGuard],
        loadComponent: () => import('./features/dashboard/dashboard.component'),
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                loadComponent: () => import('./features/dashboard/pages/home/home.component')
            },
            {
                path: 'playlist',
                loadChildren: () => import('./features/dashboard/pages/playlist/playlist.routes')
            },
            {
                path: 'canciones',
                loadComponent: () => import('./features/dashboard/pages/song/song.component')
            },
        ]
    },
    {
        path: 'error',
        canActivate: [AutenticacionGuard],
        loadComponent: () => import('./features/page-error/page-error.component')
    },
    { 
        path: '**', 
        redirectTo: 'error', 
        pathMatch: 'full' 
    }
];
