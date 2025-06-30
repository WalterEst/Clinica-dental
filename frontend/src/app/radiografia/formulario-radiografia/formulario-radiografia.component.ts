import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RadiografiaService, Radiografia } from '../../services/radiografia.service';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-formulario-radiografia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-radiografia.component.html',
  styleUrls: ['./formulario-radiografia.component.css']
})
export class FormularioRadiografiaComponent implements OnInit {
  radiografiaForm!: FormGroup;
  loading = false;
  errorMessage = '';

  buscandoPaciente = false;
  pacienteNoEncontrado = false;
  pacienteNombreCompleto = '';
  pacienteId?: number;
  archivoSeleccionado: File | null = null;

  private fb = inject(FormBuilder);
  private radiografiaService = inject(RadiografiaService);
  private pacienteService = inject(PacienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Nueva propiedad para guardar la ruta previa
  private rutaOrigen: string = '';

  ngOnInit(): void {
    this.initForm();

    const rutDesdeUrl = this.route.snapshot.paramMap.get('rut');
    if (rutDesdeUrl) {
      this.loading = true;
      this.radiografiaForm.patchValue({ rutPaciente: rutDesdeUrl });
      this.pacienteService.getPacienteByRut(rutDesdeUrl).subscribe({
        next: (paciente) => {
          this.pacienteId = paciente.id_paciente;
          this.pacienteNombreCompleto = `${paciente.nombre} ${paciente.apellido}`;
          this.radiografiaForm.patchValue({
            rutPaciente: paciente.rut,
            id_paciente: paciente.id_paciente
          });
          this.loading = false;
        },
        error: (err) => {
          console.error('No se pudo cargar paciente desde la URL', err);
          this.pacienteNoEncontrado = true;
          this.loading = false;
        }
      });
    }

    // Guardamos la URL previa escuchando eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.rutaOrigen = event.url;
      }
    });

    // Activar búsqueda en vivo si el usuario edita el RUT manualmente
    this.radiografiaForm.get('rutPaciente')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.buscandoPaciente = true;
        this.pacienteNoEncontrado = false;
        this.pacienteNombreCompleto = '';
        this.pacienteId = undefined;
        this.radiografiaForm.patchValue({ id_paciente: null }, { emitEvent: false });
      }),
      switchMap((rut: string) => {
        if (!rut || rut.length < 7) {
          this.buscandoPaciente = false;
          return of(null);
        }
        return this.pacienteService.getPacienteByRut(rut).pipe(
          catchError(() => {
            this.pacienteNoEncontrado = true;
            return of(null);
          })
        );
      })
    ).subscribe((paciente: Paciente | null) => {
      this.buscandoPaciente = false;
      if (paciente) {
        this.pacienteId = paciente.id_paciente;
        this.pacienteNombreCompleto = `${paciente.nombre} ${paciente.apellido}`;
        this.radiografiaForm.patchValue({ id_paciente: paciente.id_paciente }, { emitEvent: false });
      } else {
        this.pacienteNoEncontrado = true;
      }
    });
  }

  initForm() {
    this.radiografiaForm = this.fb.group({
      fecha_toma: ['', Validators.required],
      tipo: [''],
      archivo: [''],
      observaciones: [''],
      id_paciente: [null, Validators.required],
      rutPaciente: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.radiografiaForm.invalid || !this.archivoSeleccionado) {
      this.errorMessage = 'Completa todos los campos requeridos y selecciona un archivo.';
      return;
    }

    const formData = new FormData();
    formData.append('rutPaciente', this.radiografiaForm.value.rutPaciente);
    formData.append('fecha_toma', this.radiografiaForm.value.fecha_toma);
    formData.append('tipo', this.radiografiaForm.value.tipo || '');
    formData.append('observaciones', this.radiografiaForm.value.observaciones || '');
    formData.append('id_paciente', this.radiografiaForm.value.id_paciente);
    formData.append('archivo', this.archivoSeleccionado);

    this.loading = true;
    this.radiografiaService.subirRadiografia(formData).subscribe({
      next: () => {
        this.loading = false;
        alert('Radiografía guardada con éxito');
        this.router.navigate(['/radiografia/lista-radiografia']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al guardar radiografía:', err);
        this.errorMessage = 'Error al guardar la radiografía.';
      }
    });
  }

  cancelar() {
    // Aquí decido la navegación según la ruta de origen guardada
    if (this.rutaOrigen.includes('/paciente/detalle-paciente/')) {
      // Navegar a detalle paciente con el rut actual
      this.router.navigate(['/paciente/detalle-paciente', this.radiografiaForm.value.rutPaciente]);
    } else {
      // Navegar a lista de radiografías
      this.router.navigate(['/radiografia/lista-radiografia']);
    }
  }
}
