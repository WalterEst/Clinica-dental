import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-lista-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.css']
})
export class ListaPacienteComponent implements OnInit {
  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.getAllPaciente().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error('Error al obtener pacientes:', err)
    });
  }

  eliminarPaciente(rut: string | undefined) {
    if (!rut) {
      alert('RUT no válido');
      return;
    }

    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.deletePaciente(rut).subscribe({
        next: () => {
          alert('Paciente eliminado correctamente.');
          this.cargarPacientes();
        },
        error: (err) => {
          console.error('Error al eliminar paciente:', err);
          alert('Error al eliminar paciente.');
        }
      });
    }
  }

  //dar formato al rut
  formatearRut(rut: string): string {
  if (!rut) return '';
  
  // Elimina puntos y guión si vienen incluidos
  rut = rut.replace(/\./g, '').replace('-', '');

  // Extrae cuerpo y dígito verificador
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  // Aplica puntos cada 3 dígitos desde el final
  const cuerpoFormateado = cuerpo
    .split('')
    .reverse()
    .reduce((acc, digit, index) => {
      return digit + (index !== 0 && index % 3 === 0 ? '.' : '') + acc;
    }, '');

  return `${cuerpoFormateado}-${dv}`;
  }
}
