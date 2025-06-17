import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";

@Component({
  selector: 'app-detalle-paciente',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.css'
})
export class DetallePacienteComponent {

}
