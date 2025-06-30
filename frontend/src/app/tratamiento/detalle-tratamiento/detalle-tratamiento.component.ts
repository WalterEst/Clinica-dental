import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TratamientoService, Tratamiento } from '../../services/tratamiento.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-detalle-tratamiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './detalle-tratamiento.component.html',
  styleUrls: ['./detalle-tratamiento.component.css']
})
export class DetalleTratamientoComponent implements OnInit {
  tratamientoId!: number;
  tratamientoForm!: FormGroup;
  loading = false;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tratamientoService = inject(TratamientoService);

  ngOnInit(): void {
    this.tratamientoId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadTratamiento();
  }

  initForm() {
    this.tratamientoForm = this.fb.group({
      id_tratamiento: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: [''],
      derecho: [null],
      costo_base: [null]
    });
  }

  loadTratamiento() {
    this.loading = true;
    this.tratamientoService.getTratamientoById(this.tratamientoId).subscribe({
      next: (tratamiento) => {
        this.tratamientoForm.patchValue(tratamiento);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar tratamiento';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.tratamientoForm.invalid) return;

    const datosActualizados = this.tratamientoForm.getRawValue();

    this.tratamientoService.updateTratamiento(this.tratamientoId, datosActualizados).subscribe({
      next: () => {
        alert('Tratamiento actualizado correctamente');
        this.router.navigate(['/tratamiento/lista-tratamiento']);
      },
      error: (err) => {
        alert('Error al actualizar tratamiento: ' + (err.error?.error || err.message));
      }
    });
  }

  cancelar() {
    this.router.navigate(['/tratamiento/lista-tratamiento']);
  }
}
