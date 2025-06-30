import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz completa para mostrar o recibir citas
export interface Cita {
  id_cita: number;
  fecha_hora: string;
  duracion_minutos: number;
  estado: 'programada' | 'completada' | 'cancelada' | 'no_asistio';
  id_paciente: number;
  paciente_rut?: string;
  paciente_nombre?: string;
  paciente_apellido?: string;
  id_p_tratamiento?: number | null;
  observaciones?: string;
}

// Interfaz para crear una cita (datos mínimos requeridos para POST)
export interface CitaCrear {
  fecha_hora: string;
  duracion_minutos: number;
  estado: 'programada' | 'completada' | 'cancelada' | 'no_asistio';
  id_paciente: number;
  id_p_tratamiento?: number | null;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private api = 'http://localhost:3000/api/cita';

  constructor(private http: HttpClient) {}

  getAllCita(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.api);
  }

  getCitaById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.api}/${id}`);
  }

  createCita(data: CitaCrear): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateCita(id: number, data: Partial<Cita>): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteCita(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
