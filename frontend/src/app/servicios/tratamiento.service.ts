import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tratamiento {
  id_tratamiento?: number;
  nombre: string;
  descripcion?: string;
  derecho?: number;
  costo_base?: number;
}

@Injectable({ providedIn: 'root' })
export class TratamientoService {
  private apiUrl = 'http://localhost:3000/api/tratamientos';
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
