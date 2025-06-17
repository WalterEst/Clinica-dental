import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import type { PaymentData, PaymentMethod } from "../models/treatment.model"
import { environment } from "../../environments/environment"


@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`

  constructor(private http: HttpClient) {}

  // Obtener métodos de pago disponibles
  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.apiUrl}/methods`)
  }

  // Procesar pago
  processPayment(paymentData: PaymentData): Observable<any> {
    return this.http.post(`${this.apiUrl}/process`, paymentData)
  }

  // Validar datos de tarjeta
  validateCard(cardData: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/validate-card`, cardData)
  }

  // Calcular descuentos y cashback
  calculateTotals(treatmentId: string, paymentMethod: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate`, { treatmentId, paymentMethod })
  }
}