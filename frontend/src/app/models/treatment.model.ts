export interface Treatment {
  id: string
  name: string
  price: number
  description: string
  cashbackPercentage: number
  category: string
  duration?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PaymentMethod {
  id: string
  type: "card" | "transfer" | "mobile"
  name: string
  description: string
  icon: string
  discount?: number
  isActive: boolean
}

export interface PaymentData {
  treatmentId: string
  paymentMethod: string
  patientInfo: PatientInfo
  paymentDetails: any
  totalAmount: number
  discountAmount?: number
  cashbackAmount: number
}

export interface PatientInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  notes?: string
}
