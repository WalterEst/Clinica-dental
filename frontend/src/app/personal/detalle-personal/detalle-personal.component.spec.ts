import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePersonalComponent } from './detalle-personal.component';

describe('DetallePersonalComponent', () => {
  let component: DetallePersonalComponent;
  let fixture: ComponentFixture<DetallePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
