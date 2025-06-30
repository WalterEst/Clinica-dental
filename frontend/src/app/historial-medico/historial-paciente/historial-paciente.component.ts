import { Component, OnInit, Input } from '@angular/core';
import { HistorialMedicoService, HistorialMedico } from '../../services/historial-medico.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css']
})
export class HistorialPacienteComponent implements OnInit {
  historiales: HistorialMedico[] = [];
  cargando = true;
  error = '';

  @Input() rutPaciente: string = '';

  constructor(
    private historialmedicoService: HistorialMedicoService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    if (!this.rutPaciente) {
      this.rutPaciente = this.route.snapshot.paramMap.get('rut') || '';
    }

    if (this.rutPaciente) {
      this.cargarHistoriales();
    } else {
      this.error = 'No se especificó el RUT del paciente.';
      this.cargando = false;
    }
  }

  cargarHistoriales() {
    this.cargando = true;
    this.historialmedicoService.getHistorialByPacienteRut(this.rutPaciente).subscribe({
      next: (data) => {
        this.historiales = data.sort(
          (a, b) => new Date(b.fecha_actualizacion).getTime() - new Date(a.fecha_actualizacion).getTime()
        );
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el historial médico.';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  verDetalleHistorial(idHistorial: number) {
  this.router.navigate(['/historial-medico/detalle-historial-medico', idHistorial]);
  }

}
