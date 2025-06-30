import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PagoService, Pago } from '../../services/pago.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-detalle-pago',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css']
})
export class DetallePagoComponent implements OnInit {
  id_pago!: number;
  pagoForm!: FormGroup;
  loading = false;
  errorMessage = '';
  metodos = ['Efectivo', 'Tarjeta', 'Transferencia'];
  estados = ['Pendiente', 'Completado', 'Rechazado'];

  constructor(
    private route: ActivatedRoute,
    private pagoService: PagoService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_pago = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadPago();
  }

  initForm() {
    this.pagoForm = this.fb.group({
      id_pago: [{ value: '', disabled: true }],
      nombre_tratamiento: [{ value: '', disabled: true }],
      fecha_pago: [{ value: '', disabled: true }],
      monto: ['', Validators.required],
      metodo_pago: ['', Validators.required],
      referencia: [''],
      estado: ['', Validators.required],
    });
  }

  loadPago() {
    this.loading = true;
    this.pagoService.getPagoById(this.id_pago).subscribe({
      next: (data) => {
        this.loading = false;

        // Formatear fecha antes de setear en el formulario
        if (data.fecha_pago) {
          data.fecha_pago = this.formatearFechaHora(data.fecha_pago);
        }

        this.pagoForm.patchValue(data);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error al cargar pago: ' + (err.error?.error || err.message);
      }
    });
  }

  // Método para formatear fecha a "dd/mm/yyyy HH:mm"
  formatearFechaHora(fechaString: string): string {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
  }


  onSubmit() {
    if (this.pagoForm.invalid) return;

    let updatedData = this.pagoForm.getRawValue();

    // Elimina campos que no están en la tabla pagos
    delete updatedData.id_pago;
    delete updatedData.nombre_tratamiento;
    delete updatedData.fecha_pago; // si no quieres actualizar la fecha también, o valida según tu lógica

    this.pagoService.updatePagoById(this.id_pago, updatedData).subscribe({
      next: () => {
        alert('Pago actualizado correctamente');
        this.router.navigate(['/pago/lista-pago']);
      },
      error: (err) => {
        alert('Error al actualizar pago: ' + (err.error?.error || err.message));
      }
    });
  }


  cancelar() {
    this.router.navigate(['/pago/lista-pago']);
  }
}
