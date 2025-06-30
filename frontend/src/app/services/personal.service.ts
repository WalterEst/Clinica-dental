import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personal {
  nombre: string;
  apellido: string;
  rut?: string;
  email: string;
  telefono?: string;
  rol: 'doctor' | 'recepcionista' | 'administrativo';
}

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private api = 'http://localhost:3000/api/personal';

  constructor(private http: HttpClient) {}

  createPersonal(data: Personal): Observable<any> {
    return this.http.post(this.api, data);
  }
  getAllPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.api);
  }
  // Obtener un personal por ID o RUT
  getPersonalByRut(rut: string): Observable<Personal> {
    return this.http.get<Personal>(`${this.api}/${rut}`);
  }

  updatePersonal(rut: string, data: Partial<Personal>): Observable<any> {
    return this.http.put(`${this.api}/${rut}`, data);
  }

  deletePersonal(rut: string): Observable<any> {
    return this.http.delete(`${this.api}/${rut}`);
  }


}
