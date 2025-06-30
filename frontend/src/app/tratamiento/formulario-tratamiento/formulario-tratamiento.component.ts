import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TratamientoService, Tratamiento } from '../../services/tratamiento.service';
import { Router } from '@angular/router';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";

@Component({
  selector: 'app-formulario-tratamiento',
  standalone: true,
  imports: [FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-tratamiento.component.html',
  styleUrls: ['./formulario-tratamiento.component.css']
})
export class FormularioTratamientoComponent {
  nuevoTratamiento: Partial<Tratamiento> = {
    nombre: '',
    descripcion: '',
    derecho: null,
    costo_base: null
  };

  constructor(
    private tratamientoService: TratamientoService,
    private router: Router
  ) {}

  guardar(): void {
    if (!this.nuevoTratamiento.nombre) {
      alert('El nombre del tratamiento es obligatorio');
      return;
    }

    this.tratamientoService.createTratamiento(this.nuevoTratamiento).subscribe({
      next: (data) => {
        alert('Tratamiento creado correctamente');
        this.router.navigate(['/tratamiento/lista-tratamiento']);
      },
      error: (err) => {
        console.error('Error al crear tratamiento:', err);
        alert('Hubo un error al crear el tratamiento');
      }
    });
  }
}
