/**
 * useCalendar Hook
 * Manages calendar state with static availability
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CalendarAvailability, TimeSlot } from '@/lib/types/calendar';

// Default configuration
const CALENDAR_CONFIG = {
  advanceBookingDays: 30,
  workingDays: [1, 2, 3, 4, 5], // Monday to Friday
  minimumNoticeHours: 24,
};

interface UseCalendarOptions {
  daysToGenerate?: number;
}

interface UseCalendarReturn {
  // State
  availability: CalendarAvailability[];
  selectedDate: Date | null;
  selectedTime: string | null;
  currentMonth: Date;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setCurrentMonth: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  refreshAvailability: () => void;

  // Helpers
  isDateAvailable: (date: Date) => boolean;
  getTimeSlotsForDate: (date: Date) => TimeSlot[];
  formatDate: (date: Date) => string;
  getDaysInMonth: (date: Date) => { daysInMonth: number; startingDay: number };
}

export function useCalendar(options: UseCalendarOptions = {}): UseCalendarReturn {
  const { daysToGenerate = CALENDAR_CONFIG.advanceBookingDays } = options;

  // State
  const [availability, setAvailability] = useState<CalendarAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate static availability
  const generateAvailability = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      const generatedAvailability = generateStaticAvailability(daysToGenerate);
      setAvailability(generatedAvailability);
    } catch (err) {
      console.error('Failed to generate availability:', err);
      setError('Unable to load calendar availability');
    } finally {
      setIsLoading(false);
    }
  }, [daysToGenerate]);

  // Generate on mount
  useEffect(() => {
    generateAvailability();
  }, [generateAvailability]);

  // Clear selected time when date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // Navigation
  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  // Check if date has available slots
  const isDateAvailable = useCallback((date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    const dayAvailability = availability.find((a) => a.date === dateStr);
    return dayAvailability?.timeSlots.some((slot) => slot.available) ?? false;
  }, [availability]);

  // Get time slots for a specific date
  const getTimeSlotsForDate = useCallback((date: Date): TimeSlot[] => {
    const dateStr = date.toISOString().split('T')[0];
    const dayAvailability = availability.find((a) => a.date === dateStr);
    return dayAvailability?.timeSlots ?? [];
  }, [availability]);

  // Format date for display
  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  // Get days in month for calendar grid
  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startingDay: firstDay.getDay(),
    };
  }, []);

  return {
    // State
    availability,
    selectedDate,
    selectedTime,
    currentMonth,
    isLoading,
    error,

    // Actions
    setSelectedDate,
    setSelectedTime,
    setCurrentMonth,
    nextMonth,
    prevMonth,
    refreshAvailability: generateAvailability,

    // Helpers
    isDateAvailable,
    getTimeSlotsForDate,
    formatDate,
    getDaysInMonth,
  };
}

/**
 * Generate static availability for booking calendar
 */
function generateStaticAvailability(days: number): CalendarAvailability[] {
  const availability: CalendarAvailability[] = [];
  const today = new Date();

  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    // Skip weekends (Saturday = 6, Sunday = 0)
    const dayOfWeek = date.getDay();
    if (!CALENDAR_CONFIG.workingDays.includes(dayOfWeek)) {
      continue;
    }

    const dateStr = date.toISOString().split('T')[0];
    availability.push({
      date: dateStr,
      timeSlots: [
        { time: '09:00', available: true, formattedTime: '09:00 AM' },
        { time: '09:30', available: true, formattedTime: '09:30 AM' },
        { time: '10:00', available: true, formattedTime: '10:00 AM' },
        { time: '10:30', available: true, formattedTime: '10:30 AM' },
        { time: '11:00', available: true, formattedTime: '11:00 AM' },
        { time: '11:30', available: true, formattedTime: '11:30 AM' },
        { time: '14:00', available: true, formattedTime: '02:00 PM' },
        { time: '14:30', available: true, formattedTime: '02:30 PM' },
        { time: '15:00', available: true, formattedTime: '03:00 PM' },
        { time: '15:30', available: true, formattedTime: '03:30 PM' },
        { time: '16:00', available: true, formattedTime: '04:00 PM' },
        { time: '16:30', available: true, formattedTime: '04:30 PM' },
      ],
    });
  }

  return availability;
}

export default useCalendar;
