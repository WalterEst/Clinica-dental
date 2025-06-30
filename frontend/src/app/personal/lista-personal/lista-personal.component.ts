import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalService, Personal } from '../../services/personal.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-lista-personal',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.css']
})
export class ListaPersonalComponent implements OnInit {
  personal: Personal[] = [];

  constructor(private personalService: PersonalService) {}

  ngOnInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal() {
    this.personalService.getAllPersonal().subscribe({
      next: (data) => this.personal = data,
      error: (err) => console.error('Error al obtener personal:', err)
    });
  }

  eliminarPersonal(rut: string | undefined) {
    if (!rut) {
      alert('RUT no válido');
      return;
    }
    
    if (confirm('¿Estás seguro de eliminar este personal?')) {
      this.personalService.deletePersonal(rut).subscribe({
        next: () => {
          alert('Personal eliminado correctamente.');
          this.cargarPersonal();
        },
        error: (err) => {
          console.error('Error al eliminar personal:', err);
          alert('Error al eliminar personal.');
        }
      });
    }
  }

}
