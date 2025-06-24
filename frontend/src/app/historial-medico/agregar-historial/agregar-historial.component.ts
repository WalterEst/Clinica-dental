import { Component } from '@angular/core';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";

@Component({
  selector: 'app-agregar-historial',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './agregar-historial.component.html',
  styleUrl: './agregar-historial.component.css'
})
export class AgregarHistorialComponent {

}
