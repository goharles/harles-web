// Form Types and API Response Types

// Generic Form State
export interface FormState<T> {
  data: T;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  validationErrors: ValidationErrors;
}

export type ValidationErrors = Record<string, string>;

// Generic API Response
export interface ApiResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationErrors;
}

// Booking Form Types
export interface BookingFormData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  message?: string;
  date: string | null;
  time: string | null;
}

export interface BookingFormResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  confirmationEmail?: boolean;
}

// Contact Form Types (for future use)
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  ticketId?: string;
}

// Newsletter Subscription Types (for future use)
export interface NewsletterSubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
  consent: boolean;
}

export interface NewsletterSubscriptionResponse {
  success: boolean;
  message: string;
  subscriptionId?: string;
}

// Validation Rules
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown, formData: unknown) => string | null;
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule;
};

// Form Configuration
export interface FormConfig {
  enableValidation?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  showSuccessMessage?: boolean;
  successMessageDuration?: number;
  redirectOnSuccess?: string;
}

// API Endpoints Configuration
export const API_ENDPOINTS = {
  booking: {
    create: '/api/bookings',
    cancel: '/api/bookings/cancel',
  },
  contact: {
    submit: '/api/contact',
  },
  newsletter: {
    subscribe: '/api/newsletter/subscribe',
    unsubscribe: '/api/newsletter/unsubscribe',
  },
} as const;
