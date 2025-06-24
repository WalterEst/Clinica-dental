import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHistorialComponent } from './agregar-historial.component';

describe('AgregarHistorialComponent', () => {
  let component: AgregarHistorialComponent;
  let fixture: ComponentFixture<AgregarHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
