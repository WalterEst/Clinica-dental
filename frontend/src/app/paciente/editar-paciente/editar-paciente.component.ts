import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-editar-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './editar-paciente.component.html',
  styleUrl: './editar-paciente.component.css'
})
export class EditarPacienteComponent {
 rut!: string;
  pacienteForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rut = this.route.snapshot.paramMap.get('rut')!;
    this.initForm();
    this.loadPaciente();
  }

  initForm() {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: [{ value: '', disabled: true }],  // RUT no editable
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      fecha_nacimiento: ['']  // formato 'yyyy-MM-dd' para <input type="date">
    });
  }

  loadPaciente() {
    this.loading = true;
    this.pacienteService.getPacienteByRut(this.rut).subscribe({
      next: (data) => {
        this.loading = false;
        // Ajusta fecha_nacimiento para que sea compatible con input date (en caso que venga como ISO string)
        if (data.fecha_nacimiento) {
          data.fecha_nacimiento = data.fecha_nacimiento.substring(0, 10);
        }
        this.pacienteForm.patchValue(data);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error al cargar paciente: ' + (err.error?.error || err.message);
      }
    });
  }

  onSubmit() {
    if (this.pacienteForm.invalid) return;

    const updatedData = this.pacienteForm.getRawValue(); // incluye campos deshabilitados

    this.pacienteService.updatePaciente(this.rut, updatedData).subscribe({
      next: () => {
        alert('Paciente actualizado correctamente');
        this.router.navigate(['/paciente/lista-paciente']);
      },
      error: (err) => {
        alert('Error al actualizar paciente: ' + (err.error?.error || err.message));
      }
    });
  }

  cancelar() {
    this.router.navigate(['/paciente/lista-paciente']);
  }
}
