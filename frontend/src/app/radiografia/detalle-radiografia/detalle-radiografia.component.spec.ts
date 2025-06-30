import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRadiografiaComponent } from './detalle-radiografia.component';

describe('DetalleRadiografiaComponent', () => {
  let component: DetalleRadiografiaComponent;
  let fixture: ComponentFixture<DetalleRadiografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRadiografiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRadiografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
