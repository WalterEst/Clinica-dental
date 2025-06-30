import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tratamiento {
  precio: number | undefined;
id: any|string;
  id_tratamiento: number;
  nombre: string;
  descripcion?: string | null;
  derecho?: number | null;
  costo_base?: number | null;
  fecha_actualizacion?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private apiUrl = 'http://localhost:3000/api/tratamiento';

  constructor(private http: HttpClient) {}

  //obtiene todos lod tratamientos
  getAllTratamientos(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(this.apiUrl);
  }

  getTratamientoById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.apiUrl}/${id}`);
  }


  // Obtener tratamientos por RUT de paciente
  getTratamientosByPacienteRut(rut: string): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/${rut}`);
  }

  // Crear tratamiento
  createTratamiento(tratamiento: Partial<Tratamiento>): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.apiUrl, tratamiento);
  }

  // Actualizar tratamiento
  updateTratamiento(id: number, tratamiento: Partial<Tratamiento>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tratamiento);
  }

  // Eliminar tratamiento
  deleteTratamiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
