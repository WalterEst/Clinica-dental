import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonalService, Personal } from '../../services/personal.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-detalle-personal',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './detalle-personal.component.html',
  styleUrls: ['./detalle-personal.component.css']
})
export class DetallePersonalComponent implements OnInit {
  rut!: string;
  personalForm!: FormGroup;
  loading = false;
  errorMessage = '';

  roles = ['doctor', 'recepcionista', 'administrativo'];

  constructor(
    private route: ActivatedRoute,
    private personalService: PersonalService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rut = this.route.snapshot.paramMap.get('rut')!;
    this.initForm();
    this.loadPersonal();
  }

  initForm() {
    this.personalForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: [{ value: '', disabled: true }],  // El rut no editable
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      rol: ['', Validators.required],
    });
  }

  loadPersonal() {
    this.loading = true;
    this.personalService.getPersonalByRut(this.rut).subscribe({
      next: (data) => {
        this.loading = false;
        // Rellenar formulario con datos recibidos
        this.personalForm.patchValue(data);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error al cargar personal: ' + (err.error?.error || err.message);
      }
    });
  }

  onSubmit() {
    if (this.personalForm.invalid) return;

    const updatedData = this.personalForm.getRawValue(); // Incluye campos deshabilitados (como rut)

    this.personalService.updatePersonal(this.rut, updatedData).subscribe({
      next: () => {
        alert('Personal actualizado correctamente');
        this.router.navigate(['/personal/lista-personal']);
      },
      error: (err) => {
        alert('Error al actualizar personal: ' + (err.error?.error || err.message));
      }
    });
  }

  cancelar() {
    this.router.navigate(['/personal/lista-personal']);
  }
}
