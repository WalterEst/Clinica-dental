import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//define la interfaz Tratamiento con sus propiedades
export interface Tratamiento {
  id_tratamiento: number;
  nombre: string;
  descripcion: string;
  costo_estimado: number;
  duracion_aproximada_dias?: number;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}

//declara el servicio como inyectable en toda la aplicación
@Injectable({ providedIn: 'root' })
export class TratamientoService {

  //url base del backend para los tratamientos
  private apiUrl = 'http://localhost:3000/api/tratamientos';

  //inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.apiUrl}/${id}`);
  }

  create(data: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.apiUrl, data);
  }

  update(id: number, data: Tratamiento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
