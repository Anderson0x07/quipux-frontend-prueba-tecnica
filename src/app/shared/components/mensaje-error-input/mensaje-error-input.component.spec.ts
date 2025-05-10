import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensajeErrorInputComponent } from './mensaje-error-input.component';

describe('InputErrorMessageComponent', () => {
  let component: MensajeErrorInputComponent;
  let fixture: ComponentFixture<MensajeErrorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeErrorInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeErrorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
