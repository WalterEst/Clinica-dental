import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRadiografiaComponent } from './lista-radiografia.component';

describe('ListaRadiografiaComponent', () => {
  let component: ListaRadiografiaComponent;
  let fixture: ComponentFixture<ListaRadiografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRadiografiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRadiografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
