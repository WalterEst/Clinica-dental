import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistorialMedicoService, HistorialMedico } from '../../servicios/historial.service';

@Component({
  selector: 'app-lista-historial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-historial.component.html',
  styleUrl: './lista-historial.component.css'
})
export class ListaHistorialComponent implements OnInit {
  historiales: HistorialMedico[] = [];

  constructor(private historialService: HistorialMedicoService) {}

  ngOnInit(): void {
    this.historialService.getAll().subscribe(data => (this.historiales = data));
  }
}
