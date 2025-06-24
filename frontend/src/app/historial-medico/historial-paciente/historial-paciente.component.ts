import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";
import { HistorialMedicoService, HistorialMedico } from '../../servicios/historial.service';

@Component({
  selector: 'app-historial-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css']
})
export class HistorialPacienteComponent implements OnInit {
  idPaciente!: number;
  historial: HistorialMedico[] = [];

  constructor(
    private route: ActivatedRoute,
    private historialService: HistorialMedicoService
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idPaciente) {
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void {
    this.historialService.getByPaciente(this.idPaciente).subscribe({
      next: (data) => this.historial = data,
      error: (err) => console.error('Error al cargar historial médico', err)
    });
  }
}
