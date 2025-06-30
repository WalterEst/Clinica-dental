import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';
import { CitaService, Cita } from '../../services/cita.service';
import { PacienteService, Paciente } from '../../services/paciente.service';

@Component({
  selector: 'app-detalle-cita',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent implements OnInit {
  citaForm!: FormGroup;
  loading = false;
  errorMessage = '';
  pacientes: Paciente[] = [];
  pacienteSeleccionado?: Paciente;

  id_cita!: number;

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cita = Number(this.route.snapshot.paramMap.get('id_cita') ?? 0);
    this.initForm();
    this.loadPacientes();
  }

  initForm() {
    this.citaForm = this.fb.group({
      id_cita: [{ value: '', disabled: true }],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      duracion_minutos: ['', [Validators.required, Validators.min(1)]],
      estado: ['', Validators.required],
      id_paciente: ['', Validators.required],
      observaciones: ['']
    });
  }

  loadPacientes() {
    this.pacienteService.getAllPaciente().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.loadCita(); // Carga la cita solo después de cargar pacientes
      },
      error: () => this.errorMessage = 'Error al cargar pacientes'
    });
  }

  loadCita() {
    this.loading = true;
    this.citaService.getCitaById(this.id_cita).subscribe({
      next: (data) => {
        this.loading = false;

        this.citaForm.patchValue({
          id_cita: data.id_cita,
          fecha: this.formatFecha(data.fecha_hora),
          hora: this.formatHora(data.fecha_hora),
          duracion_minutos: data.duracion_minutos,
          estado: data.estado,
          id_paciente: data.id_paciente,
          observaciones: data.observaciones
        });

        this.pacienteSeleccionado = this.pacientes.find(p => p.id_paciente === data.id_paciente);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error al cargar cita: ' + (err.error?.error || err.message);
      }
    });
  }

  formatFecha(fechaHora: string): string {
    const d = new Date(fechaHora);
    return d.toISOString().substring(0, 10); // yyyy-MM-dd
  }

  formatHora(fechaHora: string): string {
    const d = new Date(fechaHora);
    return d.toTimeString().substring(0, 5); // HH:mm
  }

  onPacienteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const id = Number(selectedValue);

    this.pacienteSeleccionado = this.pacientes.find(p => p.id_paciente === id) || undefined;

    this.citaForm.patchValue({ id_paciente: id });
  }

  onSubmit() {
    if (this.citaForm.invalid) return;

    const fecha = this.citaForm.value.fecha;
    const hora = this.citaForm.value.hora;
    const fechaHoraDate = new Date(`${fecha}T${hora}:00`);

    // Formatear fecha en formato MySQL compatible: 'YYYY-MM-DD HH:mm:ss'
    const fechaHoraMySQL = 
      fechaHoraDate.getFullYear() + '-' +
      String(fechaHoraDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(fechaHoraDate.getDate()).padStart(2, '0') + ' ' +
      String(fechaHoraDate.getHours()).padStart(2, '0') + ':' +
      String(fechaHoraDate.getMinutes()).padStart(2, '0') + ':' +
      String(fechaHoraDate.getSeconds()).padStart(2, '0');

    const updatedData = {
      duracion_minutos: this.citaForm.value.duracion_minutos,
      estado: this.citaForm.value.estado,
      id_paciente: this.citaForm.value.id_paciente,
      observaciones: this.citaForm.value.observaciones,
      fecha_hora: fechaHoraMySQL
    };

    this.citaService.updateCita(this.id_cita, updatedData).subscribe({
      next: () => {
        alert('Cita actualizada correctamente');
        this.router.navigate(['/cita/lista-cita']);
      },
      error: (err) => {
        alert('Error al actualizar cita: ' + (err.error?.error || err.message));
      }
    });
  }

  cancelar() {
    this.router.navigate(['/cita/lista-cita']);
  }
}
