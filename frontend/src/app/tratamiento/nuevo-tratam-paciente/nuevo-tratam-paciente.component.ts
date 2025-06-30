import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { TratamientoService } from '../../services/tratamiento.service';
import { PacienteTratamientoService } from '../../services/paciente-tratamiento.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-nuevo-tratam-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './nuevo-tratam-paciente.component.html',
  styleUrl: './nuevo-tratam-paciente.component.css'
})
export class NuevoTratamPacienteComponent implements OnInit {
  tratamientoForm!: FormGroup;
  rut!: string;
  pacienteNombre = '';
  pacienteId?: number;
  tratamientos: any[] = [];
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private tratamientoService: TratamientoService,
    private pacienteTratamientoService: PacienteTratamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rut = this.route.snapshot.paramMap.get('rut') || '';
    this.initForm();
    this.cargarPaciente();
    this.cargarTratamientos();
  }

  initForm() {
    this.tratamientoForm = this.fb.group({
      id_tratamiento: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: [''],
      descripcion: [''],
      monto_aplicado: ['']
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

  cargarTratamientos() {
    this.tratamientoService.getAllTratamientos().subscribe({  // corregido typo
      next: (data) => this.tratamientos = data,
      error: () => this.errorMessage = 'Error al cargar tratamientos.'
    });
  }

  onSubmit() {
    if (this.tratamientoForm.invalid || !this.pacienteId) return;

    const datos = {
      ...this.tratamientoForm.value,
      id_paciente: this.pacienteId
    };

    this.pacienteTratamientoService.createPacienteTratamiento(datos).subscribe({
      next: () => {
        alert('Tratamiento asignado con éxito');
        this.router.navigate(['/paciente/detalle', this.rut]);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al guardar tratamiento.';
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