import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PacienteTratamiento {
  id_p_tratamiento: number;
  fecha_inicio: string;
  fecha_fin?: string | null;
  descripcion_tratamiento_paciente?: string | null;
  monto_aplicado?: number | null;
  nombre_tratamiento?: string;
  descripcion_tratamiento?: string;
  id_paciente?: number;
  id_tratamiento?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PacienteTratamientoService {
  private apiUrl = 'http://localhost:3000/api/paciente-tratamiento';

  constructor(private http: HttpClient) {}

  getPacienteTratamientosByRut(rut: string): Observable<PacienteTratamiento[]> {
    return this.http.get<PacienteTratamiento[]>(`${this.apiUrl}/paciente/${rut}`);
  }

  createPacienteTratamiento(data: Partial<PacienteTratamiento>): Observable<PacienteTratamiento> {
    return this.http.post<PacienteTratamiento>(this.apiUrl, data);
  }

  updatePacienteTratamientoById(id: number, data: Partial<PacienteTratamiento>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePacienteTratamientoById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
