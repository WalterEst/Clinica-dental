import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";
import { HistorialPacienteComponent } from "../../historial-medico/historial-paciente/historial-paciente.component";
import { PacienteService, Paciente } from '../../servicios/paciente.service';

@Component({
  selector: 'app-detalle-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent, HistorialPacienteComponent],
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.css'
})
export class DetallePacienteComponent implements OnInit {
  paciente?: Paciente;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pacienteService.getById(id).subscribe({
        next: data => (this.paciente = data),
        error: err => console.error('Error al cargar paciente', err)
      });
    }
  }
}
