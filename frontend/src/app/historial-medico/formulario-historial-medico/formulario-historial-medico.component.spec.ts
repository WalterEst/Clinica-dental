import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioHistorialMedicoComponent } from './formulario-historial-medico.component';

describe('FormularioHistorialMedicoComponent', () => {
  let component: FormularioHistorialMedicoComponent;
  let fixture: ComponentFixture<FormularioHistorialMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioHistorialMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioHistorialMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
