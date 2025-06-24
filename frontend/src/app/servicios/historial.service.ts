import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistorialMedico {
  id_historial?: number;
  descripcion: string;
  id_paciente: string;
  fecha_actualizacion?: string; // opcional, útil para mostrar
}

@Injectable({ providedIn: 'root' })
export class HistorialMedicoService {

  private apiUrl = 'http://localhost:3000/api/historiales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<HistorialMedico[]> {
    return this.http.get<HistorialMedico[]>(this.apiUrl);
  }

  getById(id: number): Observable<HistorialMedico> {
    return this.http.get<HistorialMedico>(`${this.apiUrl}/${id}`);
  }

  getByPaciente(idPaciente: number): Observable<HistorialMedico[]> {
    return this.http.get<HistorialMedico[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }

  create(data: HistorialMedico): Observable<HistorialMedico> {
    return this.http.post<HistorialMedico>(this.apiUrl, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
