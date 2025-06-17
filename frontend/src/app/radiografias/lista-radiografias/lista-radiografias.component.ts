import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";

@Component({
  selector: 'app-lista-radiografias',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './lista-radiografias.component.html',
  styleUrl: './lista-radiografias.component.css'
})
export class ListaRadiografiasComponent {

}
