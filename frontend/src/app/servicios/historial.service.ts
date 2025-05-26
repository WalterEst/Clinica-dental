import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//define la interfaz Cita con sus propiedades
export interface HistorialMedico {
  id_historial?: number;
  descripcion: string;
  id_paciente: string;
}

//declara el servicio como inyectable en toda la aplicación
@Injectable({ providedIn: 'root' })
export class HistorialMedicoService {

  //url base del backend para las citas
  private apiUrl = 'http://localhost:3000/api/historiales';

  //inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  getAll(): Observable<HistorialMedico[]> {
    return this.http.get<HistorialMedico[]>(this.apiUrl);
  }

  getById(id: number): Observable<HistorialMedico> {
    return this.http.get<HistorialMedico>(`${this.apiUrl}/${id}`);
  }

  create(data: HistorialMedico): Observable<HistorialMedico> {
    return this.http.post<HistorialMedico>(this.apiUrl, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
