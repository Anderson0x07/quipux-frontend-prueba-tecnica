import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje-error-input',
  template: '<p class="m-0 p-1 text-base text-red-500">{{mensaje}}</p>',
  styleUrls: ['./mensaje-error-input.component.scss']
})
export class MensajeErrorInputComponent {
  @Input() public mensaje: string | any;  

  @HostBinding('class')
  private clasesMensaje?: string;

  private visible = false;

  public esVisible(): boolean {
    return this.visible;
  }

  public mostrar(mensaje: any = undefined): void {
    if (mensaje) this.mensaje = mensaje;
    this.visible = true;
    this.actualizarClases(this.visible);
  }

  public ocultar(): void {
    this.visible = false;
    this.actualizarClases(this.visible);
  }

  private actualizarClases(visible: boolean) {
    this.clasesMensaje = visible ? "visible" : "";
  }
}
