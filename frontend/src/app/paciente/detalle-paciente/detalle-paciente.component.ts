import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { HistorialPacienteComponent } from "../../historial-medico/historial-paciente/historial-paciente.component";
import { TratamientoPacienteComponent } from "../../tratamiento/tratamiento-paciente/tratamiento-paciente.component";
import { RadiografiaPacienteComponent } from "../../radiografia/radiografia-paciente/radiografia-paciente.component";
import { FooterComponent } from "../../estatico/footer/footer.component";
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";

@Component({
  selector: 'app-detalle-paciente',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent, NavBarComponent, HistorialPacienteComponent, TratamientoPacienteComponent, RadiografiaPacienteComponent],
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.css'
})
export class DetallePacienteComponent implements OnInit {
  paciente: any;
  cargando: boolean = true;
  seccion: 'info' | 'historial' | 'tratamientos' | 'radiografias' = 'info';
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router
) {}

  ngOnInit(): void {
    const rut = this.route.snapshot.paramMap.get('rut');
    if (!rut) {
      this.errorMessage = 'RUT inválido o no proporcionado.';
      this.cargando = false;
      return;
    }

    this.pacienteService.getPacienteByRut(rut).subscribe({
      next: (data) => {
        this.paciente = data;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos del paciente';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  irAEditar() {
    this.router.navigate(['/paciente/editar-paciente', this.paciente.id_paciente]);
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