import { TestBed } from '@angular/core/testing';

import { PacienteTratamientoService } from './paciente-tratamiento.service';

describe('PacienteTratamientoService', () => {
  let service: PacienteTratamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteTratamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
