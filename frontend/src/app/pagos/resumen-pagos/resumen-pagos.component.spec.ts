import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPagosComponent } from './resumen-pagos.component';

describe('ResumenPagosComponent', () => {
  let component: ResumenPagosComponent;
  let fixture: ComponentFixture<ResumenPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
