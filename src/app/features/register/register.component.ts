import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificadorErrorInputDirective } from '../../directives/notificador-error-input/notificador-error-input.directive';
import { SeguridadService } from '../login/service/login.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
      FormsModule,
      ReactiveFormsModule,
      NotificadorErrorInputDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {

  private router = inject(Router);

  formRegister!: FormGroup;

  private fb = inject(FormBuilder);

  private seguridadService = inject(SeguridadService);

  public messageService = inject(MessageService)

  passwordError: string = '';

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      completeName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  onRegister(): void {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }

    const request = this.formRegister.value;

    this.seguridadService.register(request).subscribe({
      next: (response) => {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario registrado correctamente' });

        this.formRegister.reset();

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
      },
      error: (error) => {
        if (error?.error?.message) {

          const mensaje: string = error.error.message;

          const setFormError = (controlName: string, errorType: object) => {
            this.formRegister.get(controlName)?.setErrors(errorType);
          };

          this.passwordError = mensaje;
          setFormError('password', { error: true });
          

        }

      },
    });

  }

  goToLogin(): void {
    this.router.navigate(['/login']);
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

}
