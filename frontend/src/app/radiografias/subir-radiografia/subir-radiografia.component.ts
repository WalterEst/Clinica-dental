import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";

@Component({
  selector: 'app-subir-radiografia',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './subir-radiografia.component.html',
  styleUrl: './subir-radiografia.component.css'
})
export class SubirRadiografiaComponent {

}
