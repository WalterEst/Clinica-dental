import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  id_pago: number;            
  id_p_tratamiento: number;     
  fecha_pago: string;           
  monto: number;
  metodo_pago: string;
  referencia?: string;          
  estado: string;               
  nombre_tratamiento: string;  
  observaciones?: string;  
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:3000/api/pago';

  constructor(private http: HttpClient) {}

  // Obtener todos los pagos
  getAllPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  // Obtener pagos por ID de tratamiento
  getPagosPorTratamiento(id_p_tratamiento: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/tratamiento/${id_p_tratamiento}`);
  }

    // Obtener un pago por ID
  getPagoById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo pago
  createPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  // Actualizar un pago existente
  updatePagoById(id_pago: number, pago: Partial<Pago>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id_pago}`, pago);
  }

  // Eliminar un pago
  deletePagoById(id_pago: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_pago}`);
  }
}
