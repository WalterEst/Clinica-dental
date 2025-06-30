import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';
import { PacienteService, Paciente } from '../../services/paciente.service';

@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.css']
})
export class FormularioPacienteComponent {
  nuevoPaciente: Paciente = {
    rut: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: ''
  };

  constructor(private pacienteService: PacienteService) {}

  guardar() {
    this.pacienteService.createPaciente(this.nuevoPaciente).subscribe({
      next: () => {
        alert('Paciente registrado con éxito');
        this.nuevoPaciente = {
          rut: '',
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
          direccion: ''
        };
      },
      error: (err) => {
        console.error('Error al registrar paciente:', err);
        alert('Error al registrar paciente: ' + err.message);
      }
    });
  }
}
