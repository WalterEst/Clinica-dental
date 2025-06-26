import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PagosService, Pago } from '../../servicios/pago.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';



@Component({
  selector: 'app-ingresar-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './ingresar-pago.component.html',
  styleUrls: ['./ingresar-pago.component.css']
})
export class IngresarPagoComponent {
  pagoForm: FormGroup;
  mensaje = '';
  error = '';

  constructor(private fb: FormBuilder, private pagosService: PagosService) {
    this.pagoForm = this.fb.group({
  id_p_tratamiento: ['', Validators.required],
  id_paciente: ['', Validators.required], // 👈 ¡Aquí está el fix!
  monto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  metodo_pago: ['efectivo', Validators.required],
  referencia: [''],
  estado: ['pendiente', Validators.required]
});

  }

  onSubmit(): void {
    this.mensaje = '';
    this.error = '';
    if (this.pagoForm.invalid) {
      this.error = 'Formulario inválido';
      return;
    }

    const data: Pago = this.pagoForm.value;
    this.pagosService.create(data).subscribe({
      next: () => {
        this.mensaje = 'Pago registrado correctamente';
        this.pagoForm.reset({ metodo_pago: 'efectivo', estado: 'pendiente' });
      },
      error: () => {
        this.error = 'Error al registrar el pago';
      }
    });
  }
}   