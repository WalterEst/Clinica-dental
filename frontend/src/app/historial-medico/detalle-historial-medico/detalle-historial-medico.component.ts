import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HistorialMedicoService, HistorialMedico} from '../../services/historial-medico.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-detalle-historial-medico',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './detalle-historial-medico.component.html',
  styleUrls: ['./detalle-historial-medico.component.css']
})
export class DetalleHistorialMedicoComponent implements OnInit {
  historialForm!: FormGroup;
  loading = false;
  errorMessage = '';
  idHistorial!: number;

  constructor(
    private route: ActivatedRoute,
    private historialMedicoService: HistorialMedicoService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idHistorial = Number(this.route.snapshot.paramMap.get('id')!);
    this.initForm();
    this.loadHistorial();
  }

  initForm() {
    this.historialForm = this.fb.group({
      id_historial: [{ value: '', disabled: true }],
      descripcion: ['', Validators.required],
      fecha_actualizacion: [{ value: '', disabled: true }],
    });
  }

  loadHistorial() {
    this.loading = true;
    this.historialMedicoService.getHistorialMedicoById(this.idHistorial).subscribe({
      next: (data) => {
        this.loading = false;
        // Rellenar el formulario con los datos del historial
        this.historialForm.patchValue({
          id_historial: data.id_historial,
          descripcion: data.descripcion,
          fecha_actualizacion: new Date(data.fecha_actualizacion).toLocaleString(),
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error al cargar historial médico: ' + (err.error?.error || err.message);
      }
    });
  }

  onSubmit() {
    if (this.historialForm.invalid) return;

    const updatedData = {
      descripcion: this.historialForm.get('descripcion')!.value
    };

    this.historialMedicoService.updateHistorialMedico(this.idHistorial, updatedData).subscribe({
      next: () => {
        alert('Historial médico actualizado correctamente');
        this.router.navigate(['/historial-medico/lista-historial-medico']);
      },
      error: (err) => {
        alert('Error al actualizar historial médico: ' + (err.error?.error || err.message));
      }
    });
  }

  cancelar() {
    this.router.navigate(['/paciente/lista-paciente']);
  }

  eliminar() {
    if (!confirm('¿Seguro quieres eliminar este historial médico?')) return;

    this.historialMedicoService.deleteHistorialMedico(this.idHistorial).subscribe({
      next: () => {
        alert('Historial médico eliminado correctamente');
        this.router.navigate(['/paciente/lista-paciente']);
      },
      error: (err) => {
        alert('Error al eliminar historial médico: ' + (err.error?.error || err.message));
      }
    });
  }

}
