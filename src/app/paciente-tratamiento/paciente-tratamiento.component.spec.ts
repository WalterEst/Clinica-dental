import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteTratamientoComponent } from './paciente-tratamiento.component';

describe('PacienteTratamientoComponent', () => {
  let component: PacienteTratamientoComponent;
  let fixture: ComponentFixture<PacienteTratamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteTratamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
