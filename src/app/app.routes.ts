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
