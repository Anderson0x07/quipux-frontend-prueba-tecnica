import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerState {
  private activeRequests = 0;
  private spinnerSubject = new BehaviorSubject<boolean>(false);

  spinner$ = this.spinnerSubject.asObservable();

  displaySpinner(): void {
    this.activeRequests++;
    this.updateSpinnerState();
  }

  hideSpinner(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    this.updateSpinnerState();
  }

  private updateSpinnerState(): void {
    this.spinnerSubject.next(this.activeRequests > 0);
  }
}