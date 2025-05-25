import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  id_paciente: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = 'http://localhost:3000/api/pacientes';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  getById(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  update(id: string, paciente: Paciente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paciente);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
