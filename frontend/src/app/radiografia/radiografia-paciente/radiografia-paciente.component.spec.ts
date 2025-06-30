import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiografiaPacienteComponent } from './radiografia-paciente.component';

describe('RadiografiaPacienteComponent', () => {
  let component: RadiografiaPacienteComponent;
  let fixture: ComponentFixture<RadiografiaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiografiaPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiografiaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
