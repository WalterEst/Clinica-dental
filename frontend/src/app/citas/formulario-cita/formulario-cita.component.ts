import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';
import { PersonalService, Personal } from '../../servicios/personal.service';
import { PacienteService, Paciente } from '../../servicios/paciente.service';

@Component({
  selector: 'app-formulario-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-cita.component.html',
  styleUrl: './formulario-cita.component.css'
})
export class FormularioCitaComponent implements OnInit {

  citaForm!: FormGroup;
  doctores: Personal[] = [];
  pacientes: Paciente[] = [];
  pacientesFiltrados: any[] = [];
  nombrePacienteSeleccionado: string = '';

  constructor( private fb: FormBuilder, private router: Router, private personalService: PersonalService, private pacienteService: PacienteService){}

  ngOnInit(): void {
    this.initForm();
    this.cargarDoctores();
    this.cargarPacientes();
  }

  initForm(): void {
    this.citaForm = this.fb.group({
      id_paciente: ['', Validators.required],
      id_personal: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', Validators.required],
      observaciones: ['']
    });
  }

  cargarDoctores(): void {
    this.personalService.getDoctores().subscribe({
      next: (data) => {
        this.doctores = data;
      },
      error: (err) => {
        console.error('Error al cargar doctores:', err);
      }
    });
  }

  cargarPacientes(): void {
    this.pacienteService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
      }
    });
  }
  
  actualizarNombrePaciente(): void {
    const idIngresado = this.citaForm.get('id_paciente')?.value;
    const paciente = this.pacientes.find(p => p.id_paciente === idIngresado);
    this.nombrePacienteSeleccionado = paciente ? `${paciente.nombre} ${paciente.apellido}` : '';
  }

  onSubmit(): void {
    if (this.citaForm.valid) {
      const cita = this.citaForm.value;
      console.log('Datos de la cita:', cita);
    }
  }
}
