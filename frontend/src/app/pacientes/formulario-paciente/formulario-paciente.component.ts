import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavBarComponent } from "../../estatico/nav-bar/nav-bar.component";
import { FooterComponent } from "../../estatico/footer/footer.component";
import { PacienteService } from '../../servicios/paciente.service';

@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent implements OnInit {
  pacienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.pacienteForm.invalid) return;
    this.pacienteService.create(this.pacienteForm.value).subscribe({
      next: () => this.router.navigate(['/pacientes/lista-paciente']),
      error: err => console.error('Error al crear paciente', err)
    });
  }
}
