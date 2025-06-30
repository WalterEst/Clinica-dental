import { Component, OnInit, Input } from '@angular/core';
import { PacienteTratamientoService, PacienteTratamiento } from '../../services/paciente-tratamiento.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tratamiento-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tratamiento-paciente.component.html',
  styleUrls: ['./tratamiento-paciente.component.css']
})
export class TratamientoPacienteComponent implements OnInit {
  tratamientos: PacienteTratamiento[] = [];
  cargando = true;
  error = '';

  @Input() rutPaciente: string = '';

  constructor(
    private pacienteTratamientoService: PacienteTratamientoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.rutPaciente) {
      this.rutPaciente = this.route.snapshot.paramMap.get('rut') || '';
    }

    if (this.rutPaciente) {
      this.pacienteTratamientoService.getPacienteTratamientosByRut(this.rutPaciente).subscribe({
        next: (data) => {
          this.tratamientos = data;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'No se pudo cargar los tratamientos.';
          console.error(err);
          this.cargando = false;
        }
      });
    } else {
      this.error = 'No se especificó el RUT del paciente.';
      this.cargando = false;
    }
  }
}
