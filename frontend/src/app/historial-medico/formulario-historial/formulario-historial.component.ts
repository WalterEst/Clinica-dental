import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HistorialMedicoService } from '../../servicios/historial.service';

@Component({
  selector: 'app-formulario-historial',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './formulario-historial.component.html',
  styleUrl: './formulario-historial.component.css'
})
export class FormularioHistorialComponent {
  formulario = this.fb.group({
    descripcion: ['', Validators.required],
    id_paciente: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private historialService: HistorialMedicoService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.formulario.invalid) return;

    this.historialService.create(this.formulario.value).subscribe({
      next: () => this.router.navigate(['/historial-medico/lista-historial']),
      error: err => console.error('Error al crear historial', err)
    });
  }
}
