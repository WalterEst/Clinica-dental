import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Radiografia {
  rutPaciente: string;
  id_radiografia: number;
  fecha_toma: string;
  tipo?: string | null;
  archivo?: string | null;
  observaciones?: string | null;
  id_paciente: number;
  fecha_actualizacion?: string;

  nombre?: string;
  apellido?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RadiografiaService {
  private apiUrl = 'http://localhost:3000/api/radiografia';

  constructor(private http: HttpClient) {}

  getRadiografiasByRut(rut: string): Observable<Radiografia[]> {
    return this.http.get<Radiografia[]>(`${this.apiUrl}/paciente/${rut}`);
  }
    // Obtener todas las radiografías
  getAllRadiografias(): Observable<Radiografia[]> {
    return this.http.get<Radiografia[]>(this.apiUrl);
  }

  // Obtener una radiografía por su ID
  getRadiografiaById(id: number): Observable<Radiografia> {
    return this.http.get<Radiografia>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva radiografía
  createRadiografia(radiografia: Partial<Radiografia>): Observable<Radiografia> {
    return this.http.post<Radiografia>(this.apiUrl, radiografia);
  }

  // Actualizar una radiografía
  updateRadiografia(id: number, data: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }


  // Eliminar una radiografía
  deleteRadiografia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  subirRadiografia(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}`, formData);
}
}
