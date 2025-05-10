import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginResponseDTO } from "../dtos/auth/login-response.dto";

@Injectable()
export class AutenticacionGuard implements CanActivate {

    private router: Router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let valido = true;

        const url = state.url;

        const auth: LoginResponseDTO | null = this.getAuthData();

        if (auth && auth.email && auth.token) {
            valido = this.canActivateUserLogin(url);
        } else {
            valido = this.canActivateUserNoLogin(url);
        }
        return valido;
    }
    
    private getAuthData(): LoginResponseDTO | null {
        const authData = sessionStorage.getItem('AUTH');
        return authData ? JSON.parse(authData) : null;
    }
    

    private canActivateUserLogin(url: string): boolean {
        if (url.includes('login') || url.includes('register')) {
            return this.goTo('/admin/home');
        }
        return true;
    }


    private canActivateUserNoLogin(url: string): boolean {
        if (!url.includes('login') && !url.includes('register')) {
            return this.goTo('/login');
        }

        return true;
    }

    private goTo(url: string): boolean {

        this.router.navigate([url]);
        return false;
    }
}