import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Radiografia {
  id_radiografia?: number;
  fecha_toma: string;
  tipo?: string;
  archivo?: string;
  observaciones?: string;
  id_paciente: string;
}

@Injectable({ providedIn: 'root' })
export class RadiografiaService {
  private apiUrl = 'http://localhost:3000/api/radiografias';
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
