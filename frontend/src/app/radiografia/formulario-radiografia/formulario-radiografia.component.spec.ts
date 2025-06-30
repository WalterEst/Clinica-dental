import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRadiografiaComponent } from './formulario-radiografia.component';

describe('FormularioRadiografiaComponent', () => {
  let component: FormularioRadiografiaComponent;
  let fixture: ComponentFixture<FormularioRadiografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRadiografiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRadiografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
