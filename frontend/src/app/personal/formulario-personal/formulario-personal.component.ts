import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';
import { PersonalService } from '../../servicios/personal.service';

@Component({
  selector: 'app-formulario-personal',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-personal.component.html',
  styleUrls: ['./formulario-personal.component.css']
})
export class FormularioPersonalComponent implements OnInit {
  form!: FormGroup;
  successMessage: string | null = null;

  constructor(private personalService: PersonalService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      rut: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('', Validators.required),
      fecha_ingreso: new FormControl('', Validators.required),
      activo: new FormControl(true)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(){
    if (this.form.valid) {
      this.personalService.createPersonal(this.form.value).subscribe((res: any) => {
        console.log('Personal creado correctamente!');
        this.successMessage = 'Personal creado correctamente';
      });
    }
  }
}
