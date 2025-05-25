import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioHistorialComponent } from './formulario-historial.component';

describe('FormularioHistorialComponent', () => {
  let component: FormularioHistorialComponent;
  let fixture: ComponentFixture<FormularioHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
