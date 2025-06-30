import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { HistorialMedicoService } from '../../services/historial-medico.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-formulario-historial-medico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-historial-medico.component.html',
  styleUrls: ['./formulario-historial-medico.component.css']
})
export class FormularioHistorialMedicoComponent implements OnInit {
  historialForm!: FormGroup;
  rut: string = '';
  pacienteNombre = '';
  pacienteId?: number;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private historialMedicoService: HistorialMedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rut = this.route.snapshot.paramMap.get('rut') || '';
    this.initForm();
    this.cargarPaciente();
  }

  initForm() {
    this.historialForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  cargarPaciente() {
    this.pacienteService.getPacienteByRut(this.rut).subscribe({
      next: (paciente) => {
        this.pacienteNombre = `${paciente.nombre} ${paciente.apellido}`;
        this.pacienteId = paciente.id_paciente;
      },
      error: () => {
        this.errorMessage = 'Error al cargar datos del paciente.';
      }
    });
  }

  onSubmit() {
    if (this.historialForm.invalid || !this.pacienteId) return;

    const datos = {
      ...this.historialForm.value,
      id_paciente: this.pacienteId
    };

    this.historialMedicoService.createHistorialMedico(datos).subscribe({
      next: () => {
        alert('Historial médico registrado con éxito');
        this.router.navigate(['/paciente/detalle-paciente', this.rut]);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al guardar historial médico.';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/paciente/detalle-paciente', this.rut]);
  }

  formatearRut(rut: string): string {
    if (!rut) return '';
    rut = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    const cuerpoFormateado = cuerpo
      .split('')
      .reverse()
      .reduce((acc, digit, index) => digit + (index !== 0 && index % 3 === 0 ? '.' : '') + acc, '');
    return `${cuerpoFormateado}-${dv}`;
  }
}
