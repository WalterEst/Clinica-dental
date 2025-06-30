import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TratamientoService, Tratamiento } from '../../services/tratamiento.service';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";

@Component({
  selector: 'app-lista-tratamiento',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-tratamiento.component.html',
  styleUrls: ['./lista-tratamiento.component.css']
})
export class ListaTratamientoComponent implements OnInit {
  tratamientos: Tratamiento[] = [];

  constructor(private tratamientoService: TratamientoService) {}

  ngOnInit(): void {
    this.cargarTratamientos();
  }

  cargarTratamientos() {
    this.tratamientoService.getAllTratamientos().subscribe({
      next: (data) => this.tratamientos = data,
      error: (error) => console.error('Error al cargar tratamientos', error)
    });
  }

  eliminarTratamiento(id: number) {
    if (!confirm('¿Estás seguro de eliminar este tratamiento?')) return;
    this.tratamientoService.deleteTratamiento(id).subscribe({
      next: () => {
        alert('Tratamiento eliminado');
        this.cargarTratamientos();
      },
      error: (error) => console.error('Error al eliminar tratamiento', error)
    });
  }
}
