import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';
import { PersonalService, Personal } from '../../servicios/personal.service';

@Component({
  selector: 'app-lista-personal',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-personal.component.html',
  styleUrl: './lista-personal.component.css'
})
export class ListaPersonalComponent implements OnInit{
  personal: Personal[] = [];
  error: string = '';

  constructor(private personalService: PersonalService) { }

  ngOnInit(): void {
    this.loadPersonal();
  }

  loadPersonal(): void {
    this.personalService.getAll().subscribe({
      next: (data) => {
        this.personal = data;
      },
      error: (err) => {
        this.error = 'Error al cargar las personal';
        console.error(err);
      }
    });
  }
}
