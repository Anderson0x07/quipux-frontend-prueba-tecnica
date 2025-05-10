import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from './service/login.service';
import { NotificadorErrorInputDirective } from '../../directives/notificador-error-input/notificador-error-input.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NotificadorErrorInputDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {

  isLoading: boolean = false;

  private router = inject(Router);

  formLogin!: FormGroup;

  private fb = inject(FormBuilder);

  private seguridadService = inject(SeguridadService);

  passwordError: string = '';

  ngOnInit(): void {

    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });

  }

  onLogin(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const request = this.formLogin.value;

    this.seguridadService.login(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        sessionStorage.setItem('AUTH', JSON.stringify(response));
        this.router.navigate(['/admin/home']);
      },
      error: (error) => {
        if (error?.error?.message) {

          const mensaje: string = error.error.message;

          const setFormError = (controlName: string, errorType: object) => {
            this.formLogin.get(controlName)?.setErrors(errorType);
          };

          switch (true) {
            case mensaje.toLowerCase().includes('credencial'):
              setFormError('password', { invalidCredentials: true });
              break;

            case mensaje.toLowerCase().includes('no encontrado'):
              setFormError('username', { emailNotFound: true });
              break;

            default:
              this.passwordError = mensaje;
              setFormError('password', { error: true });
              break;
          }

        }

        this.isLoading = false;
      },
    });
  }

  passwordValidator(control: AbstractControl) {
    const password = control.value || '';

    const validations = {
      hasNumber: /\d/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      minLength: password.length >= 8,
    };

    return !validations.hasNumber
      ? { number: true }
      : !validations.hasUpperCase
        ? { upperCase: true }
        : !validations.minLength
          ? { minLength: true }
          : null;
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
