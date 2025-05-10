import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [],
  templateUrl: './page-error.component.html'
})
export default class PageErrorComponent {

  private router: Router = inject(Router);

  goToHome() {

    const authData = sessionStorage.getItem('AUTH');

    debugger

    if (authData) {
      const auth = JSON.parse(authData);
      if (auth && auth.email && auth.token) {
        this.router.navigate(['/admin/inicio']);
        return;
      }
    }

    this.router.navigate(['/login']);
    
  }
}
