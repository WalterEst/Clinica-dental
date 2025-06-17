import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPagoComponent } from './ingresar-pago.component';

describe('IngresarPagoComponent', () => {
  let component: IngresarPagoComponent;
  let fixture: ComponentFixture<IngresarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
