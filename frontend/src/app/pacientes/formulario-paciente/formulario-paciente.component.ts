import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";
import { PacienteService, Paciente } from '../../servicios/paciente.service';

@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;

    const datos: Paciente = this.formulario.value;
    this.pacienteService.create(datos).subscribe({
      next: () => this.router.navigate(['/pacientes/lista-paciente']),
      error: err => console.error('Error al crear paciente', err)
    });
  }
}
