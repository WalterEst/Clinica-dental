import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTratamPacienteComponent } from './nuevo-tratam-paciente.component';

describe('NuevoTratamPacienteComponent', () => {
  let component: NuevoTratamPacienteComponent;
  let fixture: ComponentFixture<NuevoTratamPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoTratamPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoTratamPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
