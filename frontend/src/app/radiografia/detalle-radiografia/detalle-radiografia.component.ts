import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadiografiaService } from '../../services/radiografia.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-detalle-radiografia',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './detalle-radiografia.component.html',
  styleUrls: ['./detalle-radiografia.component.css']
})
export class DetalleRadiografiaComponent implements OnInit {
  radiografiaForm!: FormGroup;
  radiografia: any = null;
  cargando = true;
  errorMessage = '';
  backendUrl = 'http://localhost:3000/uploads';

  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private radiografiaService: RadiografiaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.radiografiaForm = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      apellido: [{ value: '', disabled: true }],
      rutPaciente: [{ value: '', disabled: true }],
      fecha_toma: ['', Validators.required],
      tipo: [''],
      observaciones: [''],
      archivo: ['']
    });

    const idRadiografia = Number(this.route.snapshot.paramMap.get('id'));
    if (!idRadiografia) {
      this.errorMessage = 'ID inválido';
      this.cargando = false;
      return;
    }

    this.radiografiaService.getRadiografiaById(idRadiografia).subscribe({
      next: (data) => {
        this.radiografia = data;
        this.radiografiaForm.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          rutPaciente: data.rutPaciente,
          fecha_toma: data.fecha_toma?.split('T')[0] || '',
          tipo: data.tipo,
          observaciones: data.observaciones,
          archivo: data.archivo
        });
        this.cargando = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar radiografía';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.radiografiaForm.patchValue({ archivo: this.selectedFile.name });
    }
  }

  onSubmit(): void {
    if (this.radiografiaForm.invalid) return;

    if (!this.radiografia) {
      this.errorMessage = 'No hay datos para actualizar';
      return;
    }

    const formData = new FormData();
    formData.append('fecha_toma', this.radiografiaForm.get('fecha_toma')?.value);
    formData.append('tipo', this.radiografiaForm.get('tipo')?.value || '');
    formData.append('observaciones', this.radiografiaForm.get('observaciones')?.value || '');

    if (this.selectedFile) {
      formData.append('archivo', this.selectedFile);
    }

    this.radiografiaService.updateRadiografia(this.radiografia.id_radiografia, formData).subscribe({
      next: () => {
        alert('Radiografía actualizada correctamente');
        this.router.navigate(['/radiografia/lista-radiografia']);
      },
      error: (err) => {
        this.errorMessage = 'Error al actualizar la radiografía';
        console.error(err);
      }
    });
  }

  eliminarRadiografia() {
  if (!confirm('¿Seguro que deseas eliminar esta radiografía?')) return;

  this.radiografiaService.deleteRadiografia(this.radiografia.id_radiografia).subscribe({
    next: () => {
      alert('Radiografía eliminada correctamente');
      this.router.navigate(['/radiografia/lista-radiografia']);
    },
    error: (err) => {
      console.error('Error al eliminar radiografía:', err);
      alert('No se pudo eliminar la radiografía');
    }
  });
}

  cancelar() {
    this.router.navigate(['/paciente/lista-paciente']);
  }
}
