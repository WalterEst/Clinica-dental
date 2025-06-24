import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HistorialMedicoService } from '../../servicios/historial.service';

@Component({
  selector: 'app-formulario-historial',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './formulario-historial.component.html',
  styleUrl: './formulario-historial.component.css'
})
export class FormularioHistorialComponent implements OnInit {
  formulario!: FormGroup; // solo se declara aquí

  constructor(
    private fb: FormBuilder,
    private historialService: HistorialMedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
      id_paciente: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;

    const datos = {
      descripcion: this.formulario.value.descripcion ?? '',
      id_paciente: this.formulario.value.id_paciente ?? ''
    };

    this.historialService.create(datos).subscribe({
      next: () => this.router.navigate(['/historial-medico/lista-historial']),
      error: err => console.error('Error al crear historial', err)
    });
  }
}
