import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//define la interfaz Radiografia con sus propiedades
export interface Radiografia {
  id_radiografia?: number;
  fecha_toma: string;
  tipo?: string;
  archivo?: string;
  observaciones?: string;
  id_paciente: string;
}

//declara el servicio como inyectable en toda la aplicación
@Injectable({ providedIn: 'root' })
export class RadiografiaService {

  //url base del backend para las radiografías
  private apiUrl = 'http://localhost:3000/api/radiografias';

  //inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  getAll(): Observable<Radiografia[]> {
    return this.http.get<Radiografia[]>(this.apiUrl);
  }

  getById(id: number): Observable<Radiografia> {
    return this.http.get<Radiografia>(`${this.apiUrl}/${id}`);
  }

  create(data: Radiografia): Observable<Radiografia> {
    return this.http.post<Radiografia>(this.apiUrl, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
