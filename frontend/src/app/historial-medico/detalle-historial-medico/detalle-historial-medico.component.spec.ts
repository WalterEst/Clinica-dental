import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHistorialMedicoComponent } from './detalle-historial-medico.component';

describe('DetalleHistorialMedicoComponent', () => {
  let component: DetalleHistorialMedicoComponent;
  let fixture: ComponentFixture<DetalleHistorialMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleHistorialMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleHistorialMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
