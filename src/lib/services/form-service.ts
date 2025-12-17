/**
 * Form Service
 * Handles form submission logic and API communication
 */

import type {
  BookingFormData,
  BookingFormResponse,
  ContactFormData,
  ContactFormResponse,
  ValidationErrors,
  ApiResponse,
} from '@/lib/types/forms';
import { API_ENDPOINTS } from '@/lib/types/forms';

/**
 * Submit booking form
 */
export async function submitBookingForm(data: BookingFormData): Promise<BookingFormResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.booking.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to submit booking',
      };
    }

    return result;
  } catch (error) {
    console.error('Booking submission error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.contact.submit, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to submit contact form',
      };
    }

    return result;
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Validate form data client-side
 */
export function validateBookingForm(data: BookingFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // First Name
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name
  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Company
  if (!data.company?.trim()) {
    errors.company = 'Company name is required';
  }

  // Job Title
  if (!data.jobTitle?.trim()) {
    errors.jobTitle = 'Job title is required';
  }

  // Date
  if (!data.date) {
    errors.date = 'Please select a date';
  }

  // Time
  if (!data.time) {
    errors.time = 'Please select a time slot';
  }

  // Phone (optional but validate format if provided)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Message (optional but validate length if provided)
  if (data.message && data.message.length > 1000) {
    errors.message = 'Message must be less than 1000 characters';
  }

  return errors;
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message?.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }

  return errors;
}

/**
 * Helper: Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Helper: Validate phone format
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Generic API request handler with error handling
 */
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Request failed with status ${response.status}`,
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: data.message || 'Success',
      data: data.data || data,
    };
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

