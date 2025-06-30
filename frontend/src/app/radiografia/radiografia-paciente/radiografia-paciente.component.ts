import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RadiografiaService, Radiografia } from '../../services/radiografia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radiografia-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radiografia-paciente.component.html',
  styleUrls: ['./radiografia-paciente.component.css']
})
export class RadiografiaPacienteComponent implements OnInit {
  radiografias: Radiografia[] = [];
  cargando = true;
  error = '';

  @Input() rutPaciente: string = '';

  constructor(
    private radiografiaService: RadiografiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.rutPaciente) {
      this.rutPaciente = this.route.snapshot.paramMap.get('rut') || '';
    }

    if (this.rutPaciente) {
      this.cargarRadiografias();
    } else {
      this.error = 'No se especificó el RUT del paciente.';
      this.cargando = false;
    }
  }

  cargarRadiografias() {
    this.cargando = true;
    this.radiografiaService.getRadiografiasByRut(this.rutPaciente).subscribe({
      next: (data) => {
        this.radiografias = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las radiografías.';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  verDetalleRadiografia(id: number) {
    this.router.navigate(['/radiografia/detalle-radiografia', id]);
  }
}
