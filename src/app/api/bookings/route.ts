/**
 * Bookings API Endpoint
 * Handles booking submissions and stores them in DynamoDB
 */

import { NextRequest, NextResponse } from 'next/server';
import type { BookingFormData, BookingFormResponse } from '@/lib/types/forms';
import { createBooking } from '@/lib/services/dynamodb-booking';

/**
 * POST - Create a new booking
 */
export async function POST(request: NextRequest): Promise<NextResponse<BookingFormResponse>> {
  try {
    // Debug logging for environment variables
    console.log('API Route - Environment check:', {
      hasAccessKey: !!process.env.APP_AWS_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.APP_AWS_REGION || process.env.AWS_REGION,
      bookingsTable: process.env.DYNAMODB_BOOKINGS_TABLE,
    });

    const body = await request.json() as BookingFormData;

    // Validate required fields
    const validationErrors = validateBookingForm(body);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        success: false,
        message: validationErrors.join(', '),
      }, { status: 400 });
    }

    // Create booking in DynamoDB
    // Note: date and time are validated above, so they are guaranteed to be non-null here
    const result = await createBooking({
      name: `${body.firstName} ${body.lastName}`,
      email: body.email.trim().toLowerCase(),
      phone: body.phone || '',
      date: body.date!,
      time: body.time!,
      message: body.message || '',
    });

    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: result.error || 'Failed to create booking',
      }, { status: 500 });
    }

    // TODO: Send confirmation email
    // In production, you would send an email here
    // await sendBookingConfirmationEmail(body, result.bookingId);

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      bookingId: result.bookingId,
      confirmationEmail: true,
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }, { status: 500 });
  }
}

/**
 * Validate booking form data
 */
function validateBookingForm(data: BookingFormData): string[] {
  const errors: string[] = [];

  // Required field validation
  if (!data.firstName?.trim()) {
    errors.push('First name is required');
  } else if (data.firstName.length < 2) {
    errors.push('First name must be at least 2 characters');
  }

  if (!data.lastName?.trim()) {
    errors.push('Last name is required');
  } else if (data.lastName.length < 2) {
    errors.push('Last name must be at least 2 characters');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.company?.trim()) {
    errors.push('Company name is required');
  }

  if (!data.jobTitle?.trim()) {
    errors.push('Job title is required');
  }

  if (!data.date) {
    errors.push('Please select a date');
  } else {
    const bookingDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
      errors.push('Please select a future date');
    }
  }

  if (!data.time) {
    errors.push('Please select a time slot');
  }

  // Optional field validation
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Please enter a valid phone number');
  }

  if (data.message && data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  return errors;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (basic validation)
 */
function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, dashes, parentheses, and plus sign
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}
