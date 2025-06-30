import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalService, Personal } from '../../services/personal.service';
import { FooterComponent } from "../../estatico/footer/footer.component";
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";

@Component({
  selector: 'app-formulario-personal',
  standalone: true,
  imports: [CommonModule, FormsModule,NavBarComponent, FooterComponent],
  templateUrl: './formulario-personal.component.html',
  styleUrls: ['./formulario-personal.component.css']
})
export class FormularioPersonalComponent {
  nuevoPersonal: Personal = {
    nombre: '',
    apellido: '',
    email: '',
    rol: 'doctor'
  };

  constructor(private personalService: PersonalService) {}

  guardar() {
    this.personalService.createPersonal(this.nuevoPersonal).subscribe({
      next: () => {
        alert('Personal registrado con éxito');
        this.nuevoPersonal = {
          nombre: '',
          apellido: '',
          email: '',
          rol: 'doctor'
        };
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar personal: ' + err.message);
      }
    });
  }
}
