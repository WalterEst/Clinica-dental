import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';
import { PagoService, Pago } from '../../services/pago.service';

@Component({
  selector: 'app-lista-pago',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-pago.component.html',
  styleUrls: ['./lista-pago.component.css']
})
export class ListaPagoComponent implements OnInit {
  pagos: Pago[] = [];

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.getAllPagos();
  }

  getAllPagos() {
    this.pagoService.getAllPagos().subscribe({
      next: (data) => this.pagos = data,
      error: (err) => console.error('Error al obtener pagos:', err)
    });
  }

  deletePagoById(id_pago: number | undefined) {
    if (id_pago === undefined) {
      alert('ID de pago no válido');
      return;
    }

    if (confirm('¿Estás seguro de eliminar este pago?')) {
      this.pagoService.deletePagoById(id_pago).subscribe({
        next: () => {
          alert('Pago eliminado correctamente.');
          this.getAllPagos();
        },
        error: (err) => {
          console.error('Error al eliminar pago:', err);
          alert('Error al eliminar pago.');
        }
      });
    }
  }
}
