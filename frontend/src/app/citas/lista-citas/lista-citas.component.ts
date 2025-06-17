import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';
import { Cita, CitaService } from '../../servicios/cita.service';

  @Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css'
})
export class ListaCitasComponent implements OnInit {
  citas: Cita[] = [];
  error: string = '';

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (data) => {
        this.citas = data;
      },
      error: (err) => {
        this.error = 'Error al cargar las citas';
        console.error(err);
      }
    });
  }
}