import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InicioComponent } from './estatico/inicio/inicio.component';
import { FormularioCitaComponent } from './citas/formulario-cita/formulario-cita.component';
import { ListaCitasComponent } from './citas/lista-citas/lista-citas.component';
import { HistorialPacienteComponent } from './historial-medico/historial-paciente/historial-paciente.component';
import { AgregarHistorialComponent } from './historial-medico/agregar-historial/agregar-historial.component';
import { FormularioHistorialComponent } from './historial-medico/formulario-historial/formulario-historial.component';
import { FormularioAsignacionComponent } from './paciente-tratamientos/formulario-asignacion/formulario-asignacion.component';
import { ListaAsignacionesComponent } from './paciente-tratamientos/lista-asignaciones/lista-asignaciones.component';
import { DetallePacienteComponent } from './pacientes/detalle-paciente/detalle-paciente.component';
import { FormularioPacienteComponent } from './pacientes/formulario-paciente/formulario-paciente.component';
import { ListaPacienteComponent } from './pacientes/lista-paciente/lista-paciente.component';
import { ListaPagosComponent } from './pagos/lista-pagos/lista-pagos.component';
import { ResumenPagosComponent } from './pagos/resumen-pagos/resumen-pagos.component';
import { FormularioPersonalComponent } from './personal/formulario-personal/formulario-personal.component';
import { ListaPersonalComponent } from './personal/lista-personal/lista-personal.component';
import { ListaRadiografiasComponent } from './radiografias/lista-radiografias/lista-radiografias.component';
import { SubirRadiografiaComponent } from './radiografias/subir-radiografia/subir-radiografia.component';
import { FormularioTratamientoComponent } from './tratamientos/formulario-tratamiento/formulario-tratamiento.component';
import { ListaTratamientosComponent } from './tratamientos/lista-tratamientos/lista-tratamientos.component';
import { IngresarPagoComponent } from './pagos/ingresar-pago/ingresar-pago.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pacientes/lista-paciente', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'estatico/inicio', component: InicioComponent },
  { path: 'citas/formulario-cita', component: FormularioCitaComponent },
  { path: 'citas/lista-citas', component: ListaCitasComponent },
  { path: 'historial-medico/historial-paciente', component: HistorialPacienteComponent },
  { path: 'historial-medico/agregar-historial', component: AgregarHistorialComponent },
  { path: 'historial-medico/formulario-historial', component: FormularioHistorialComponent},
  { path: 'paciente-tratamientos/formulario-asignacion', component: FormularioAsignacionComponent },
  { path: 'paciente-tratamientos/lista-asignaciones', component: ListaAsignacionesComponent },
  { path: 'pacientes/detalle-paciente/:id', component: DetallePacienteComponent },
  { path: 'pacientes/formulario-paciente', component: FormularioPacienteComponent },
  { path: 'pacientes/lista-paciente', component: ListaPacienteComponent },
  { path: 'pagos/lista-pagos', component: ListaPagosComponent },
  { path: 'pagos/resumen-pagos', component: ResumenPagosComponent },
  { path: 'personal/formulario-personal', component: FormularioPersonalComponent },
  { path: 'personal/lista-personal', component: ListaPersonalComponent },
  { path: 'radiografias/lista-radiografias', component: ListaRadiografiasComponent },
  { path: 'radiografias/subir-radiografia', component: SubirRadiografiaComponent },
  { path: 'tratamientos/formulario-tratamiento', component: FormularioTratamientoComponent },
  { path: 'tratamientos/lista-tratamientos', component: ListaTratamientosComponent },
  {path: 'pagos/ingresar-pago', component: IngresarPagoComponent}
];
