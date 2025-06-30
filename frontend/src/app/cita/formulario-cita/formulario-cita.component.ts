import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/cita.service';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

interface CitaCrear {
  fecha_hora: string; // Fecha y hora combinadas en ISO
  duracion_minutos: number;
  estado: 'programada' | 'completada' | 'cancelada' | 'no_asistio';
  id_paciente: number;
  observaciones: string;
}

@Component({
  selector: 'app-formulario-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.css']
})
export class FormularioCitaComponent implements OnInit {
  pacientes: Paciente[] = [];

  // Variables para fecha y hora por separado
  fecha: string = '';
  hora: string = '';

  nuevaCita: CitaCrear = {
    fecha_hora: '',
    duracion_minutos: 30,
    estado: 'programada',
    id_paciente: 0,
    observaciones: ''
  };

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.getAllPaciente().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('Error al obtener pacientes:', err);
        alert('Error al cargar pacientes.');
      }
    });
  }

  guardar() {
    if (!this.fecha || !this.hora || this.nuevaCita.id_paciente === 0) {
      alert('Por favor completa fecha, hora y selecciona un paciente.');
      return;
    }

    // Combinar fecha y hora en formato ISO: "YYYY-MM-DDTHH:mm:ss"
    this.nuevaCita.fecha_hora = `${this.fecha}T${this.hora}:00`;

    this.citaService.createCita(this.nuevaCita).subscribe({
      next: () => {
        alert('Cita registrada con éxito');
        // Reiniciar formulario
        this.fecha = '';
        this.hora = '';
        this.nuevaCita = {
          fecha_hora: '',
          duracion_minutos: 30,
          estado: 'programada',
          id_paciente: 0,
          observaciones: ''
        };
      },
      error: (err) => {
        console.error('Error al registrar cita:', err);
        alert('Error al registrar cita: ' + err.message);
      }
    });
  }
}
