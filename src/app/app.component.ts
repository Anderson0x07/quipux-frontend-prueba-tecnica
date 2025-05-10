import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, ToastModule],
  templateUrl: './app.component.html',
  providers: [MessageService],
})
export class AppComponent {
  title = 'quipux-front-prueba-tecnica';
}
