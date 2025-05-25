import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirRadiografiaComponent } from './subir-radiografia.component';

describe('SubirRadiografiaComponent', () => {
  let component: SubirRadiografiaComponent;
  let fixture: ComponentFixture<SubirRadiografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirRadiografiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirRadiografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
