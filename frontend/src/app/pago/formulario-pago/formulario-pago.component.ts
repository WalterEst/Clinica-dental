import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PagoService, Pago } from '../../services/pago.service';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { PacienteTratamientoService, PacienteTratamiento } from '../../services/paciente-tratamiento.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-formulario-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-pago.component.html',
  styleUrls: ['./formulario-pago.component.css']
})
export class FormularioPagoComponent implements OnInit {
  pacientes: Paciente[] = [];
  tratamientos: PacienteTratamiento[] = [];
  selectedPacienteRut: string | null = null;

  metodos = ['Efectivo', 'Tarjeta', 'Transferencia'];
  estados = ['Pendiente', 'Completado', 'Rechazado'];

  nuevoPago: Partial<Pago> = {
    id_p_tratamiento: 0,
    monto: 0,
    metodo_pago: 'Efectivo',
    referencia: '',
    estado: 'Pendiente'
  };

  constructor(
    private pagoService: PagoService,
    private pacienteService: PacienteService,
    private pacienteTratamientoService: PacienteTratamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.getAllPaciente().subscribe({
      next: data => this.pacientes = data,
      error: err => console.error('Error al obtener pacientes:', err)
    });
  }

  cargarTratamientos() {
    this.tratamientos = [];
    this.nuevoPago.id_p_tratamiento = 0;
    if (this.selectedPacienteRut) {
      this.pacienteTratamientoService.getPacienteTratamientosByRut(this.selectedPacienteRut).subscribe({
        next: data => this.tratamientos = data,
        error: err => console.error('Error al obtener tratamientos:', err)
      });
    }
  }

  guardar() {
    if (!this.nuevoPago.id_p_tratamiento) {
      alert('Seleccione un tratamiento');
      return;
    }
    this.pagoService.createPago(this.nuevoPago as Pago).subscribe({
      next: () => {
        alert('Pago registrado correctamente');
        this.router.navigate(['/pago/lista-pago']);
      },
      error: err => {
        console.error('Error al registrar pago:', err);
        alert('Error al registrar pago');
      }
    });
  }
}
