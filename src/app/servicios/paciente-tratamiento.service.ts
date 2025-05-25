import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PacienteTratamiento {
  id_p_tratamiento?: number;
  fecha_inicio: string;
  fecha_fin?: string;
  descripcion?: string;
  monto_aplicado?: number;
  id_paciente: string;
  id_tratamiento: number;
}

@Injectable({ providedIn: 'root' })
export class PacienteTratamientoService {
  private apiUrl = 'http://localhost:3000/api/paciente-tratamientos';
  constructor(private http: HttpClient) {}

  getAll(): Observable<PacienteTratamiento[]> {
    return this.http.get<PacienteTratamiento[]>(this.apiUrl);
  }

  getById(id: number): Observable<PacienteTratamiento> {
    return this.http.get<PacienteTratamiento>(`${this.apiUrl}/${id}`);
  }

  create(data: PacienteTratamiento): Observable<PacienteTratamiento> {
    return this.http.post<PacienteTratamiento>(this.apiUrl, data);
  }

  update(id: number, data: PacienteTratamiento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
