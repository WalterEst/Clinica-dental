import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//define la interfaz Personal con sus propiedades
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

//declara el servicio como inyectable en toda la aplicación
@Injectable({ providedIn: 'root' })
export class PersonalService {

  //url base del backend para el personal
  private apiUrl = 'http://localhost:3000/api/personal';

  //inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  getAll(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  getById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.apiUrl}/${id}`);
  }

  createPersonal(personal: Personal): Observable<any> {
    return this.http.post(this.apiUrl, personal);
  }
  update(id: number, data: Personal): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Nuevo método para obtener solo los doctores
  getDoctores(): Observable<Personal[]> {
    return this.http.get<Personal[]>(`${this.apiUrl}/doctores`);
  }
}
