import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitaService, Cita } from '../../services/cita.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-lista-cita',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-cita.component.html',
  styleUrls: ['./lista-cita.component.css']
})
export class ListaCitaComponent implements OnInit {
  citas: Cita[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.getAllCita().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al obtener citas:', err)
    });
  }

  eliminarCita(id_cita: number | undefined) {
    if (id_cita === undefined) {
      alert('ID de cita no válido');
      return;
    }
    
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
      this.citaService.deleteCita(id_cita).subscribe({
        next: () => {
          alert('Cita eliminada correctamente.');
          this.cargarCitas();
        },
        error: (err) => {
          console.error('Error al eliminar cita:', err);
          alert('Error al eliminar cita.');
        }
      });
    }
  }
}
