'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCalendar } from '@/lib/hooks/useCalendar';
import { useForm } from '@/lib/hooks/useForm';
import { validateBookingForm, submitBookingForm } from '@/lib/services/form-service';
import type { BookingFormData, BookingFormResponse } from '@/lib/types/forms';

// Initial form values
const initialFormValues: BookingFormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  jobTitle: '',
  phone: '',
  message: '',
  date: null,
  time: null,
};

export default function BookACall() {
  const [bookingResult, setBookingResult] = useState<BookingFormResponse | null>(null);

  // Calendar hook for managing calendar state (uses static availability)
  const calendar = useCalendar({ daysToGenerate: 30 });

  // Form hook for managing form state
  const form = useForm<BookingFormData>({
    initialValues: initialFormValues,
    validate: validateBookingForm,
    onSubmit: async (values) => {
      // Update form values with selected date and time
      const bookingData: BookingFormData = {
        ...values,
        date: calendar.selectedDate?.toISOString().split('T')[0] || null,
        time: calendar.selectedTime,
      };

      const result = await submitBookingForm(bookingData);

      if (result.success) {
        setBookingResult(result);
      }

      return result;
    },
    config: {
      validateOnBlur: true,
      validateOnChange: false,
    },
  });

  // Sync selected date/time with form
  useEffect(() => {
    if (calendar.selectedDate) {
      form.setFieldValue('date', calendar.selectedDate.toISOString().split('T')[0]);
    }
  }, [calendar.selectedDate]);

  useEffect(() => {
    if (calendar.selectedTime) {
      form.setFieldValue('time', calendar.selectedTime);
    }
  }, [calendar.selectedTime]);

  // Get current month calendar data
  const { daysInMonth, startingDay } = calendar.getDaysInMonth(calendar.currentMonth);

  // Get time slots for selected date
  const availableTimeSlots = calendar.selectedDate
    ? calendar.getTimeSlotsForDate(calendar.selectedDate)
    : [];

  // Success state - show confirmation
  if (form.isSubmitted && bookingResult?.success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 lg:py-28">
          <div className="container max-w-2xl text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-highlight-soft rounded-full mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">Call Booked Successfully!</h1>
              <p className="text-lg text-muted-foreground mb-2">
                Thank you, {form.values.firstName}! Your call has been scheduled.
              </p>
              <p className="text-muted-foreground">
                <strong>Date:</strong> {calendar.selectedDate && calendar.formatDate(calendar.selectedDate)} at {calendar.selectedTime}
              </p>
              {bookingResult.bookingId && (
                <p className="text-sm text-muted-foreground mt-2">
                  Booking Reference: <strong>{bookingResult.bookingId}</strong>
                </p>
              )}
            </div>
            {/* <p className="text-muted-foreground mb-8">
              You&apos;ll receive a confirmation email at <strong>{form.values.email}</strong> with the meeting details.
            </p> */}
            <Link href="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 lg:py-24">
        <div className="container">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Book a <span className="text-gradient">Discovery Call</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule a personalized consultation with our sustainability experts. We&apos;ll discuss your organization&apos;s needs and show you how Harles &amp; Associates can help you achieve your ESG goals.
            </p>
          </div>

          {/* Form Error Message */}
          {form.submitError && (
            <div className="max-w-3xl mx-auto mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              <strong>Error:</strong> {form.submitError}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Your Details</h2>
              <form onSubmit={form.handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={form.values.firstName}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      required
                      disabled={form.isSubmitting}
                      className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                        form.getFieldError('firstName') ? 'border-destructive' : 'border-input'
                      }`}
                      placeholder="John"
                    />
                    {form.getFieldError('firstName') && (
                      <p className="text-sm text-destructive mt-1">{form.getFieldError('firstName')}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={form.values.lastName}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      required
                      disabled={form.isSubmitting}
                      className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                        form.getFieldError('lastName') ? 'border-destructive' : 'border-input'
                      }`}
                      placeholder="Doe"
                    />
                    {form.getFieldError('lastName') && (
                      <p className="text-sm text-destructive mt-1">{form.getFieldError('lastName')}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Work Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    required
                    disabled={form.isSubmitting}
                    className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      form.getFieldError('email') ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="john@company.com"
                  />
                  {form.getFieldError('email') && (
                    <p className="text-sm text-destructive mt-1">{form.getFieldError('email')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.values.company}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    required
                    disabled={form.isSubmitting}
                    className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      form.getFieldError('company') ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Acme Inc."
                  />
                  {form.getFieldError('company') && (
                    <p className="text-sm text-destructive mt-1">{form.getFieldError('company')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                    Job Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={form.values.jobTitle}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    required
                    disabled={form.isSubmitting}
                    className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      form.getFieldError('jobTitle') ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Sustainability Manager"
                  />
                  {form.getFieldError('jobTitle') && (
                    <p className="text-sm text-destructive mt-1">{form.getFieldError('jobTitle')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.values.phone || ''}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    disabled={form.isSubmitting}
                    className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                      form.getFieldError('phone') ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="+233 55 555 0000"
                  />
                  {form.getFieldError('phone') && (
                    <p className="text-sm text-destructive mt-1">{form.getFieldError('phone')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    What would you like to discuss? <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.values.message || ''}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    rows={3}
                    disabled={form.isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                    placeholder="Tell us about your sustainability goals or challenges..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={!calendar.selectedDate || !calendar.selectedTime || form.isSubmitting}
                >
                  {form.isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Booking</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>

                {(!calendar.selectedDate || !calendar.selectedTime) && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please select a date and time to complete your booking
                  </p>
                )}
              </form>
            </div>

            {/* Right Column - Calendar & Benefits */}
            <div className="space-y-6">
              {/* Calendar */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Select Date & Time</h2>
                  {calendar.isLoading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Loading...
                    </div>
                  )}
                </div>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={calendar.prevMonth}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-medium">
                    {calendar.currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    type="button"
                    onClick={calendar.nextMonth}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-6">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: startingDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-10" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const date = new Date(calendar.currentMonth.getFullYear(), calendar.currentMonth.getMonth(), i + 1);
                    const isAvailable = calendar.isDateAvailable(date);
                    const isSelected = calendar.selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => isAvailable && calendar.setSelectedDate(date)}
                        disabled={!isAvailable}
                        className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : isAvailable
                            ? 'hover:bg-secondary'
                            : 'text-muted-foreground/40 cursor-not-allowed'
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {calendar.selectedDate && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Available times for {calendar.formatDate(calendar.selectedDate)}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimeSlots.length > 0 ? (
                        availableTimeSlots.filter(slot => slot.available).map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => calendar.setSelectedTime(slot.time)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              calendar.selectedTime === slot.time
                                ? 'bg-primary text-primary-foreground'
                                : 'border border-border hover:bg-secondary'
                            }`}
                          >
                            {slot.formattedTime || slot.time}
                          </button>
                        ))
                      ) : (
                        <p className="col-span-3 text-sm text-muted-foreground text-center py-4">
                          No available time slots for this date
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* What to Expect */}
              <div className="bg-highlight-soft rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Personalized Consultation',
                      description: 'Our experts will guide you through tailored solutions for your sustainability challenges.',
                    },
                    {
                      title: 'Platform Walkthrough',
                      description: 'See how our ESG tools can streamline your reporting and compliance workflows.',
                    },
                    {
                      title: 'Actionable Insights',
                      description: 'Receive data-driven recommendations to improve your ESG performance.',
                    },
                    {
                      title: 'No Commitment Required',
                      description: 'This is a discovery call to understand your needs—no pressure.',
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <div className="shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

