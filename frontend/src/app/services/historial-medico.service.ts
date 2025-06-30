import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface HistorialMedico {
  rutPaciente: string;
  id_historial: number;
  descripcion: string;
  id_paciente: number;
  fecha_actualizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {
  private apiUrl = 'http://localhost:3000/api/historial';

  constructor(private http: HttpClient) {}

  // Coincide con: getHistorialByPacienteRut
  getHistorialByPacienteRut(rut: string): Observable<HistorialMedico[]> {
    return this.http.get<HistorialMedico[]>(`${this.apiUrl}/${rut}`);
  }


  // Coincide con: createHistorialMedico
  createHistorialMedico(historial: Partial<HistorialMedico>): Observable<HistorialMedico> {
    return this.http.post<HistorialMedico>(this.apiUrl, historial);
  }

  // Coincide con: updateHistorialByPacienteRut
  updateHistorialByPacienteRut(rut: string, data: Partial<HistorialMedico>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rut}`, data);
  }

  // Coincide con: deleteHistorialMedico (por ID del historial)
  deleteHistorialMedico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getHistorialMedicoById(id: number): Observable<HistorialMedico> {
  return this.http.get<HistorialMedico>(`${this.apiUrl}/id/${id}`);
}

  updateHistorialMedico(id: number, data: Partial<HistorialMedico>): Observable<any> {
    return this.http.put(`${this.apiUrl}/id/${id}`, data);
  }
}
