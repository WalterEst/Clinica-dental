import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, BehaviorSubject } from "rxjs"
import type { Treatment } from "../models/treatment.model"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class TreatmentService {
  private apiUrl = `${environment.apiUrl}/treatments`
  private treatmentsSubject = new BehaviorSubject<Treatment[]>([])
  public treatments$ = this.treatmentsSubject.asObservable()

  constructor(private http: HttpClient) {}

  // Obtener todos los tratamientos activos
  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.apiUrl}/active`)
  }

  // Obtener tratamiento por ID
  getTreatmentById(id: string): Observable<Treatment> {
    return this.http.get<Treatment>(`${this.apiUrl}/${id}`)
  }

  // Cargar tratamientos y actualizar el subject
  loadTreatments(): void {
    this.getTreatments().subscribe({
      next: (treatments) => {
        this.treatmentsSubject.next(treatments)
      },
      error: (error) => {
        console.error("Error loading treatments:", error)
        this.treatmentsSubject.next([])
      },
    })
  }

  // Buscar tratamientos por categoría
  getTreatmentsByCategory(category: string): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.apiUrl}/category/${category}`)
  }
}