import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginResponseDTO } from '../../dtos/auth/login-response.dto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {

    router = inject(Router);

    sidebarOpen = false;

    user!: LoginResponseDTO;


    ngOnInit(): void {
      const auth: LoginResponseDTO = JSON.parse(sessionStorage.getItem('AUTH') || '{}');
      if (auth && auth.email && auth.token) {
        this.user = auth;
      }
    }

    onLogout(): void {
      sessionStorage.removeItem('AUTH');
      this.router.navigate(['/login']);
    };

}
