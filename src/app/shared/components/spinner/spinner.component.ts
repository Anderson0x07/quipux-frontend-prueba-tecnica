import { Component, inject } from '@angular/core';
import { SpinnerState } from '../../../interceptor/spinner.state';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
  spinnerState: SpinnerState = inject(SpinnerState);

  isLoading = this.spinnerState.spinner$;
}
