// Calendar Types for Static Availability

/**
 * Represents availability for a single date
 */
export interface CalendarAvailability {
  date: string; // ISO date string (YYYY-MM-DD)
  timeSlots: TimeSlot[];
}

/**
 * Represents a single time slot
 */
export interface TimeSlot {
  time: string; // 24h format (HH:MM)
  available: boolean;
  formattedTime: string; // Display format (e.g., "09:00 AM")
}

/**
 * Calendar state for UI
 */
export interface CalendarState {
  isLoading: boolean;
  error: string | null;
  availability: CalendarAvailability[];
  selectedDate: Date | null;
  selectedTime: string | null;
  currentMonth: Date;
}
