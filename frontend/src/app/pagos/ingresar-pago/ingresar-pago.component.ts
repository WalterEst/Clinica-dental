import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingresar-pago',
  standalone: true,
  templateUrl: './ingresar-pago.component.html',
  styleUrls: ['./ingresar-pago.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class IngresarPagoComponent {
  currentStep = 1;
  isLoading = false;
  error: string | null = null;

  treatmentForm: FormGroup;
  paymentMethodForm: FormGroup;
  patientForm: FormGroup;
  paymentDetailsForm: FormGroup;

  treatments = [
    {
      id: '1',
      name: 'Limpieza Dental',
      price: 30000,
      description: 'Limpieza profunda y pulido dental',
      cashbackPercentage: 10
    },
    {
      id: '2',
      name: 'Ortodoncia Básica',
      price: 150000,
      description: 'Ortodoncia con brakets metálicos',
      cashbackPercentage: 5
    }
  ];

  paymentMethods = [
    {
      id: 'card',
      type: 'card',
      name: 'Tarjeta de Crédito',
      description: 'Paga con tu tarjeta de crédito o débito',
      discount: 0,
      isActive: true
    },
    {
      id: 'transfer',
      type: 'transfer',
      name: 'Transferencia Bancaria',
      description: 'Obtén un 5% de descuento pagando por transferencia',
      discount: 5,
      isActive: true
    },
    {
      id: 'mobile',
      type: 'mobile',
      name: 'Pago por App',
      description: 'Usa WebPay, MercadoPago u otra app',
      discount: 2,
      isActive: true
    }
  ];

  selectedTreatment: any = null;
  subtotal = 0;
  discountAmount = 0;
  totalAmount = 0;
  cashbackAmount = 0;

  steps = [
    { id: 1, title: 'Seleccionar Tratamiento', description: 'Elige tu tratamiento' },
    { id: 2, title: 'Método de Pago', description: 'Selecciona el método de pago' },
    { id: 3, title: 'Información de Pago', description: 'Completa los datos del paciente' },
    { id: 4, title: 'Confirmación', description: 'Revisa y confirma tu pago' }
  ];

  constructor(private fb: FormBuilder) {
    this.treatmentForm = this.fb.group({
      treatmentId: ['', Validators.required]
    });

    this.paymentMethodForm = this.fb.group({
      paymentMethod: ['card', Validators.required]
    });

    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.paymentDetailsForm = this.fb.group({}); // Simulado para evitar errores

    this.setupFormSubscriptions();
  }

  setupFormSubscriptions(): void {
    this.treatmentForm.get('treatmentId')?.valueChanges.subscribe(id => {
      this.selectedTreatment = this.treatments.find(t => t.id === id) || null;
      this.calculateTotals();
    });

    this.paymentMethodForm.get('paymentMethod')?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    if (!this.selectedTreatment) return;
    const paymentMethod = this.paymentMethodForm.get('paymentMethod')?.value;
    const discount = this.paymentMethods.find(p => p.type === paymentMethod)?.discount || 0;

    this.subtotal = this.selectedTreatment.price;
    this.discountAmount = this.subtotal * (discount / 100);
    this.totalAmount = this.subtotal - this.discountAmount;
    this.cashbackAmount = this.subtotal * (this.selectedTreatment.cashbackPercentage / 100);
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1: return this.treatmentForm.valid;
      case 2: return this.paymentMethodForm.valid;
      case 3: return this.patientForm.valid;
      default: return true;
    }
  }

  validateAllForms(): boolean {
    return this.treatmentForm.valid && this.paymentMethodForm.valid && this.patientForm.valid;
  }

  processPayment(): void {
    if (!this.validateAllForms()) return;
    this.isLoading = true;
    setTimeout(() => {
      console.log('✅ Pago simulado');
      this.isLoading = false;
      this.currentStep = 4;
    }, 1000);
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(value);
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }
}
