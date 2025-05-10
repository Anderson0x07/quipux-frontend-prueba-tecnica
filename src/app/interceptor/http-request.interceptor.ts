import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerState } from './spinner.state';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponseDTO } from '../dtos/auth/login-response.dto';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

    const spinnerState = inject(SpinnerState);
    const router = inject(Router);

    spinnerState.displaySpinner();


    let contentHeader = getOnlyTypeJson();
    
    return next(request.clone({setHeaders: contentHeader})).pipe(
        tap({
            next: (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    spinnerState.hideSpinner();
                }
            },
            error: (err: HttpErrorResponse) => {
                if ((err.status == 401 || err.status == 403) && err.error?.message?.toLowerCase().includes('token')) {
                    sessionStorage.removeItem('AUTH');
                    router.navigate(['login']);
                }
                spinnerState.hideSpinner();
            }
        })
    );

}
  
function getOnlyTypeJson(): Record<string, string> {
    const authJson = sessionStorage.getItem('AUTH');
    const auth: LoginResponseDTO | null = authJson ? JSON.parse(authJson) : null;
  
    const object = {
        'Content-Type': 'application/json;charset=UTF-8',
    }

    if (auth?.token) {
      return {
        ...object,
        Authorization: `Bearer ${auth.token}`,
      };
    }
  
    return object;
}
  