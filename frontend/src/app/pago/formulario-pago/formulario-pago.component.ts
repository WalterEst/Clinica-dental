import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { PacienteTratamientoService, PacienteTratamiento } from '../../services/paciente-tratamiento.service';
import { PagoService } from '../../services/pago.service';
import { NavBarComponent } from '../../estatico/nav-bar/nav-bar.component';
import { FooterComponent } from '../../estatico/footer/footer.component';

@Component({
  selector: 'app-formulario-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-pago.component.html',
  styleUrls: ['./formulario-pago.component.css']
})
export class FormularioPagoComponent implements OnInit {
  pagoForm!: FormGroup;
  pacientes: Paciente[] = [];
  tratamientos: PacienteTratamiento[] = [];
  loading = false;
  errorMessage = '';
  metodos = ['Efectivo', 'Tarjeta', 'Transferencia'];
  estados = ['Pendiente', 'Completado', 'Rechazado'];

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private pacienteTratamientoService: PacienteTratamientoService,
    private pagoService: PagoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarPacientes();
  }

  initForm() {
    this.pagoForm = this.fb.group({
      id_paciente: ['', Validators.required],
      id_p_tratamiento: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      metodo_pago: ['', Validators.required],
      referencia: [''],
      estado: ['Pendiente', Validators.required]
    });
  }

  cargarPacientes() {
    this.pacienteService.getAllPaciente().subscribe({
      next: (data) => this.pacientes = data,
      error: () => this.errorMessage = 'Error al cargar pacientes'
    });
  }

  onPacienteChange() {
    const id = this.pagoForm.get('id_paciente')?.value;
    this.tratamientos = [];
    if (id) {
      const paciente = this.pacientes.find(p => p.id_paciente === +id);
      if (paciente) {
        this.pacienteTratamientoService.getPacienteTratamientosByRut(paciente.rut).subscribe({
          next: (data) => this.tratamientos = data,
          error: () => this.errorMessage = 'Error al cargar tratamientos'
        });
      }
    }
  }

  onSubmit() {
    if (this.pagoForm.invalid) return;
    const datos = { ...this.pagoForm.value };
    delete (datos as any).id_paciente;
    this.loading = true;
    this.pagoService.createPago(datos).subscribe({
      next: () => {
        this.loading = false;
        alert('Pago registrado con éxito');
        this.router.navigate(['/pago/lista-pago']);
      },
      error: (err) => {
        this.loading = false;
        alert('Error al registrar pago: ' + (err.error?.error || err.message));
      }
    });
  }

  cancelar() {
    this.router.navigate(['/pago/lista-pago']);
  }
}

