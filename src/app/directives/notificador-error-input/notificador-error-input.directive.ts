import { AfterViewInit, ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ErrorSobrescritura, ResolutorMensajesErrorService } from '../../shared/services/resolutor-mensajes-error.service';
import { MensajeErrorInputComponent } from '../../shared/components/mensaje-error-input/mensaje-error-input.component';

@Directive({
  selector: '[appNotificadorErrorInput]',
  standalone: true
})
export class NotificadorErrorInputDirective implements AfterViewInit, OnDestroy {
  constructor(private ngControl: NgControl,
    private renderer: Renderer2,
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private resolutorMensajesSrv: ResolutorMensajesErrorService) { }

  @Input() mensajesErrorSobrescritura: ErrorSobrescritura = {};

  @Input() clasesContenedor: string = "";

  @Input() applyOnblur: boolean = false;
  
  private instanciaMensaje: ComponentRef<MensajeErrorInputComponent> | any = null;
  private componenteMensaje: MensajeErrorInputComponent | any = null;

  private control?: AbstractControl | any;
  private elementoNativo: HTMLElement | any;

  private controlSubscription: Subscription | any;

  public ngAfterViewInit(): void {
    this.configurarControl();
    this.configurarElementoNativo();

    if (!this.control) return;

    this.crearComponenteMensaje();
    const elementoDiv = this.crearElementoContenedor();
    this.rodearElementoActual(elementoDiv);

    this.insertarComponenteMensaje(elementoDiv);

    this.controlSubscription = this.control
      .statusChanges
      .pipe(
        debounceTime(300)
      ).subscribe({
        next: (status: any) => {
          const { errors } = this.control;
          this.manejarErroresInput(errors, this.mensajesErrorSobrescritura);
        },
      });
  }

  public ngOnDestroy(): void {
    this.controlSubscription?.unsubscribe();
  }

  private crearComponenteMensaje(): void {
    if (this.instanciaMensaje) return;
    this.instanciaMensaje = this.viewContainerRef.createComponent(MensajeErrorInputComponent);
    this.componenteMensaje = this.instanciaMensaje.instance;
  }

  private insertarComponenteMensaje(elemento: HTMLElement): void {
    const elementoComponente: HTMLElement = this.instanciaMensaje.location.nativeElement;
    elemento.appendChild(elementoComponente);
  }

  private manejarErroresInput(errors: ValidationErrors, erroresSobrescritura?: ErrorSobrescritura): void {
    const hayErrores = errors && Object.keys(errors).length > 0;
    if (hayErrores) this.mostrarError(errors, erroresSobrescritura);
    else this.ocultarError();
  }

  private mostrarError(
    errores: ValidationErrors,
    erroresSobrescritura?: ErrorSobrescritura
  ): void {
    if (!this.control) return;

    const mensajeError = this.resolutorMensajesSrv.construirMensajeError(
      errores,
      erroresSobrescritura
    );

    this.componenteMensaje.mostrar();
    this.componenteMensaje.mensaje = mensajeError;

    this.renderer.addClass(this.elementoNativo, "input-error");
  }

  private ocultarError(): void {
    if (!this.control) return;

    this.componenteMensaje.mensaje = "";
    this.componenteMensaje.ocultar();

    this.renderer.removeClass(this.elementoNativo, "input-error");
  }

  private crearElementoContenedor(): HTMLElement {
    const element = this.renderer.createElement("div");
    if (this.clasesContenedor)
      this.renderer.addClass(element, this.clasesContenedor);
    return element;
  }

  private rodearElementoActual(elemento: HTMLElement): void {
    const parent = this.elementoNativo.parentNode;
    this.renderer.insertBefore(parent, elemento, this.elementoNativo);
    this.renderer.removeChild(parent, this.elementoNativo);
    this.renderer.appendChild(elemento, this.elementoNativo);
  }

  private configurarControl(): void {
    const { control } = this.ngControl;
    this.control = control;
  }

  private configurarElementoNativo(): void {
    this.elementoNativo = this.el.nativeElement as HTMLElement;
  }

  @HostListener('onClear')
  @HostListener('onBlur')
  @HostListener('blur')
  onListenerBlur() {
    if (this.applyOnblur) {
      const { errors } = this.control;
      this.manejarErroresInput(errors, this.mensajesErrorSobrescritura);
    }
  }
}
