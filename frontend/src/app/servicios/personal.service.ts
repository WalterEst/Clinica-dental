import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personal {
  id_personal?: number;
  nombre: string;
  apellido: string;
  rut?: string;
  email: string;
  telefono?: string;
  rol: 'doctor' | 'recepcionista' | 'administrativo';
  activo?: boolean;
  fecha_ingreso?: string;
}

@Injectable({ providedIn: 'root' })
export class PersonalService {
  private apiUrl = 'http://localhost:3000/api/personal';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  getById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.apiUrl}/${id}`);
  }

  create(data: Personal): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, data);
  }

  update(id: number, data: Personal): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
