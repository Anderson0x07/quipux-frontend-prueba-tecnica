import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MensajesValidacionInput } from '../../constant/mensajes-validacion-input.constant';

export type ErrorSobrescritura = { [key: string]: string };

export type EspecificacionErrorInput = {
  llaveError: string;
  parametros: { [key: string]: any }
};

@Injectable({
  providedIn: 'root'
})
export class ResolutorMensajesErrorService {

  private errorSobrescrituraGeneral: ErrorSobrescritura = {};


  public construirMensajeError(errors: ValidationErrors, erroresSobrescritura?: ErrorSobrescritura): string {
    const error: any = this.obtenerPrimerError(errors, erroresSobrescritura);
    return this.resolverMensajeError(error, erroresSobrescritura);
  }


  public resolverMensajeError(error: EspecificacionErrorInput, erroresSobrescritura?: ErrorSobrescritura | any): string {
    const { llaveError, parametros } = error;

    const errorResuelto = 
      this.resolverMensajeSobrescritura(llaveError, erroresSobrescritura)
      ?? this.resolverMensajeSobrescrituraGeneral(llaveError)
      ?? this.resolverMensajePredefinido(llaveError)
      ?? MensajesValidacionInput.default;

    return this.formatearMensaje(errorResuelto, parametros);
  }

  public definirErroresSobrescritura(errores: ErrorSobrescritura) {
    if (!errores) return;
    this.errorSobrescrituraGeneral = errores;
  }

  private resolverMensajePredefinido(llaveError: string): string | undefined {
    if (!(llaveError in MensajesValidacionInput)) return undefined;
    return MensajesValidacionInput[llaveError];
  }

  private resolverMensajeSobrescritura(llaveError: string, errores: ErrorSobrescritura): string | undefined {
    if (!errores
      || Object.keys(errores).length == 0
      || !(llaveError in errores))
      return undefined;
    return errores[llaveError];
  }

  private resolverMensajeSobrescrituraGeneral(llaveError: string): string | undefined {
    const errores = this.errorSobrescrituraGeneral
    if (!errores
      || Object.keys(errores).length == 0
      || !(llaveError in errores))
      return undefined;
    return errores[llaveError];
  }

  private formatearMensaje(mensaje: string, parametros: { [key: string]: any }): string {
    let mensajeFinal = mensaje;
    for (const parametro in parametros) {
      const valor = parametros[parametro];
      const llave = `#${parametro.toUpperCase()}`;
      mensajeFinal = mensajeFinal.replace(llave, valor);
    }

    return mensajeFinal;
  }


  private obtenerPrimerError(errors: ValidationErrors, erroresSobrescritura?: ErrorSobrescritura): EspecificacionErrorInput | null {
    const entries = Object.entries(errors);
    const newEntries = erroresSobrescritura && erroresSobrescritura!=null ? Object.entries(erroresSobrescritura) : null;

    if (!entries || entries.length == 0) return null;

    let findEntry = newEntries && newEntries.length>0 ? entries.find(entry => entry[0] == newEntries[0][0]):entries[0];

    const [llaveError, parametros] = findEntry ? findEntry as [string, any]: entries[0];
    return { llaveError, parametros } as EspecificacionErrorInput;
  }
}
