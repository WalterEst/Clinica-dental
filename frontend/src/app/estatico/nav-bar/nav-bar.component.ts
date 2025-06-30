import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Esta es la función clave
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterViewInit {

  // Inyectamos el ID de la plataforma actual
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Esto se ejecuta después de que la vista del componente se ha inicializado
  ngAfterViewInit(): void {
    // Solo ejecutamos esta lógica si estamos en el navegador (no en SSR)
    if (isPlatformBrowser(this.platformId)) {
      const button = document.getElementById('mobile-menu-button');
      const menu = document.getElementById('mobile-menu');

      button?.addEventListener('click', () => {
        menu?.classList.toggle('show');
      });
    }
  }
}