import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAsignacionComponent } from './formulario-asignacion.component';

describe('FormularioAsignacionComponent', () => {
  let component: FormularioAsignacionComponent;
  let fixture: ComponentFixture<FormularioAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAsignacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
