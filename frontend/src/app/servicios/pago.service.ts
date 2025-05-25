import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  id_pago?: number;
  id_p_tratamiento: number;
  fecha_pago?: string;
  monto: number;
  metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia';
  referencia?: string;
  estado?: 'pendiente' | 'completado' | 'rechazado';
}

@Injectable({ providedIn: 'root' })
export class PagosService {
  private apiUrl = 'http://localhost:3000/api/pagos';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  create(data: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
