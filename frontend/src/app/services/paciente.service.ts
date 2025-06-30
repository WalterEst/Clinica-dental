import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  id_paciente?: number; // es autoincremental, no lo envías al crear
  rut: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento?: string; // tipo string (formato ISO) para compatibilidad con HTML y JSON
  telefono?: string;
  email?: string;
  direccion?: string;
  fecha_actualizacion?: string; // lo genera el backend, opcional
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private api = 'http://localhost:3000/api/paciente';

  constructor(private http: HttpClient) {}

  createPaciente(data: Paciente): Observable<any> {
    return this.http.post(this.api, data);
  }
  getAllPaciente(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.api);
  }
  // Obtener un Paciente por ID o RUT
  getPacienteByRut(rut: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.api}/${rut}`);
  }

  updatePaciente(rut: string, data: Partial<Paciente>): Observable<any> {
    return this.http.put(`${this.api}/${rut}`, data);
  }

  deletePaciente(rut: string): Observable<any> {
    return this.http.delete(`${this.api}/${rut}`);
  }


}
