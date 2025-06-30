import { Routes } from '@angular/router';
import { FormularioPersonalComponent } from './personal/formulario-personal/formulario-personal.component';
import { ListaPersonalComponent } from './personal/lista-personal/lista-personal.component';
import { DetallePersonalComponent } from './personal/detalle-personal/detalle-personal.component';
import { InicioComponent } from './estatico/inicio/inicio.component';
import { ListaPacienteComponent } from './paciente/lista-paciente/lista-paciente.component';
import { FormularioPacienteComponent } from './paciente/formulario-paciente/formulario-paciente.component';
import { DetallePacienteComponent } from './paciente/detalle-paciente/detalle-paciente.component';
import { ListaCitaComponent } from './cita/lista-cita/lista-cita.component';
import { FormularioCitaComponent } from './cita/formulario-cita/formulario-cita.component';
import { DetalleCitaComponent } from './cita/detalle-cita/detalle-cita.component';
import { EditarPacienteComponent } from './paciente/editar-paciente/editar-paciente.component';
import { TratamientoPacienteComponent } from './tratamiento/tratamiento-paciente/tratamiento-paciente.component';
import { HistorialPacienteComponent } from './historial-medico/historial-paciente/historial-paciente.component';
import { RadiografiaPacienteComponent } from './radiografia/radiografia-paciente/radiografia-paciente.component';
import { ListaTratamientoComponent } from './tratamiento/lista-tratamiento/lista-tratamiento.component';
import { FormularioTratamientoComponent } from './tratamiento/formulario-tratamiento/formulario-tratamiento.component';
import { DetalleTratamientoComponent } from './tratamiento/detalle-tratamiento/detalle-tratamiento.component';
import { ListaRadiografiaComponent } from './radiografia/lista-radiografia/lista-radiografia.component';
import { FormularioRadiografiaComponent } from './radiografia/formulario-radiografia/formulario-radiografia.component';
import { DetalleRadiografiaComponent } from './radiografia/detalle-radiografia/detalle-radiografia.component';
import { NuevoTratamPacienteComponent } from './tratamiento/nuevo-tratam-paciente/nuevo-tratam-paciente.component';
import { DetalleHistorialMedicoComponent } from './historial-medico/detalle-historial-medico/detalle-historial-medico.component';
import { FormularioHistorialMedicoComponent } from './historial-medico/formulario-historial-medico/formulario-historial-medico.component';
import { ListaPagoComponent } from './pago/lista-pago/lista-pago.component';
import { FormularioPagoComponent } from './pago/formulario-pago/formulario-pago.component';
import { DetallePagoComponent } from './pago/detalle-pago/detalle-pago.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pago/lista-pago', pathMatch: 'full' },
  { path: 'estatico/inicio', component: InicioComponent },
  //PERSONAL
  { path: 'personal/formulario-personal', component: FormularioPersonalComponent },
  { path: 'personal/lista-personal', component: ListaPersonalComponent },
  { path: 'personal/detalle-personal/:rut', component: DetallePersonalComponent },

  //PACIENTE
  { path: 'paciente/lista-paciente', component: ListaPacienteComponent },
  { path: 'paciente/formulario-paciente', component: FormularioPacienteComponent },
  { path: 'paciente/detalle-paciente/:rut', component: DetallePacienteComponent },
  { path: 'paciente/editar-paciente/:rut', component: EditarPacienteComponent },

  //CITA
  { path: 'cita/lista-cita', component: ListaCitaComponent },
  { path: 'cita/formulario-cita', component: FormularioCitaComponent },
  { path: 'cita/detalle-cita/:id_cita', component: DetalleCitaComponent },

  //HISTORIAL MEDICO
  { path: 'historial-medico/historial-paciente/:rut', component: HistorialPacienteComponent },
  { path: 'historial-medico/detalle-historial-medico', component: DetalleHistorialMedicoComponent },
  { path: 'historial-medico/formulario-historial-medico/:rut', component: FormularioHistorialMedicoComponent },
  { path: 'historial-medico/detalle-historial-medico/:id', component: DetalleHistorialMedicoComponent },
  

  //TRATAMIENTO
  { path: 'tratamiento/tratamiento-paciente/:rut', component: TratamientoPacienteComponent },
  { path: 'tratamiento/lista-tratamiento', component: ListaTratamientoComponent },
  { path: 'tratamiento/formulario-tratamiento', component: FormularioTratamientoComponent },
  { path: 'tratamiento/detalle-tratamiento/:id', component: DetalleTratamientoComponent },
  { path: 'tratamiento/nuevo-tratam-paciente/:rut', component: NuevoTratamPacienteComponent },
  

  //RADIOGRAFIA
  { path: 'radiografia/radiografia-paciente/:rut', component: RadiografiaPacienteComponent },
  { path: 'radiografia/lista-radiografia', component: ListaRadiografiaComponent },
  { path: 'radiografia/formulario-radiografia', component: FormularioRadiografiaComponent },
  { path: 'radiografia/formulario-radiografia/:rut', component: FormularioRadiografiaComponent },
  { path: 'radiografia/detalle-radiografia/:id', component: DetalleRadiografiaComponent },

  //PAGO
  { path: 'pago/lista-pago', component: ListaPagoComponent },
  { path: 'pago/formulario-pago', component: FormularioPagoComponent },
  { path: 'pago/detalle-pago/:id', component: DetallePagoComponent },
];
