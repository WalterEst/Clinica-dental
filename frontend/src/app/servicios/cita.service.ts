import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//define la interfaz Cita con sus propiedades
export interface Cita {
  id_cita?: number;
  fecha_hora: string;
  duracion_minutos: number;
  estado?: 'programada' | 'completada' | 'cancelada' | 'no_asistio';
  id_paciente: string;
  id_p_tratamiento?: number | null;
  observaciones?: string;
}

//declara el servicio como inyectable en toda la aplicación
@Injectable({providedIn: 'root'})
export class CitaService {

  //url base del backend para las citas
  private apiUrl = 'http://localhost:3000/api/citas';

  //inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  getCitaById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  updateCita(id: number, cita: Cita): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cita);
  }

  deleteCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
