import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RadiografiaService, Radiografia } from '../../services/radiografia.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-lista-radiografia',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-radiografia.component.html',
  styleUrls: ['./lista-radiografia.component.css']
})
export class ListaRadiografiaComponent implements OnInit {
  radiografias: Radiografia[] = [];

  constructor(private radiografiaService: RadiografiaService) {}

  ngOnInit(): void {
    this.cargarRadiografias();
  }

  cargarRadiografias() {
    this.radiografiaService.getAllRadiografias().subscribe({
      next: (data) => this.radiografias = data,
      error: (err) => console.error('Error al obtener radiografías:', err)
    });
  }

  eliminarRadiografia(id: number) {
    if (confirm('¿Estás seguro de eliminar esta radiografía?')) {
      this.radiografiaService.deleteRadiografia(id).subscribe({
        next: () => {
          alert('Radiografía eliminada correctamente.');
          this.cargarRadiografias();
        },
        error: (err) => {
          console.error('Error al eliminar radiografía:', err);
          alert('Error al eliminar radiografía.');
        }
      });
    }
  }
}
