import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//define la interfaz Paciente con sus propiedades
export interface Paciente {
  id_paciente?: string;
  nombre: string;
  apellido: string;
  /**
   * Fecha de nacimiento manejada como string en el frontend pero almacenada
   * como `DATE` en la base de datos.  Se acepta `string` o `Date` para
   * simplificar la conversión antes de enviar los datos al backend.
   */
  fecha_nacimiento?: string | Date;
  telefono?: string;
  email?: string;
  direccion?: string;
}

//declara el servicio como inyectable en toda la aplicación
@Injectable({ providedIn: 'root' })
export class PacienteService {

  //url base del backend para los pacientes
  private apiUrl = 'http://localhost:3000/api/pacientes';

  //inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  getById(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  create(paciente: Paciente): Observable<Paciente> {
    const payload = {
      ...paciente,
      fecha_nacimiento: paciente.fecha_nacimiento
        ? new Date(paciente.fecha_nacimiento)
        : undefined,
    };
    return this.http.post<Paciente>(this.apiUrl, payload);
  }

  update(id: string, paciente: Paciente): Observable<any> {
    const payload = {
      ...paciente,
      fecha_nacimiento: paciente.fecha_nacimiento
        ? new Date(paciente.fecha_nacimiento)
        : undefined,
    };
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
