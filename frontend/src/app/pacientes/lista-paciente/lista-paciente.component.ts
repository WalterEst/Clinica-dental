import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";
import { PacienteService, Paciente } from '../../servicios/paciente.service';

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

  cargarPacientes(): void {
    this.pacienteService.getAll().subscribe({
      next: data => (this.pacientes = data),
      error: err => console.error('Error al cargar pacientes', err)
    });
  }

  eliminarPaciente(id: string): void {
    this.pacienteService.delete(id).subscribe({
      next: () => this.cargarPacientes(),
      error: err => console.error('Error al eliminar paciente', err)
    });
  }
}
