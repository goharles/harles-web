import { 
  PutCommand, 
  GetCommand, 
  UpdateCommand, 
  ScanCommand, 
  QueryCommand,
  DeleteCommand 
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { dynamoDbClient, TABLES } from '@/lib/config/aws-dynamodb';

// Types for booking data
export interface BookingDocument {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
}

export interface CreateBookingResult {
  success: boolean;
  bookingId?: string;
  error?: string;
}

/**
 * Create a new booking in DynamoDB
 */
export async function createBooking(bookingData: CreateBookingData): Promise<CreateBookingResult> {
  try {
    const bookingId = uuidv4();
    const now = new Date().toISOString();
    
    const booking: BookingDocument = {
      id: bookingId,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      date: bookingData.date,
      time: bookingData.time,
      message: bookingData.message || '',
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    const command = new PutCommand({
      TableName: TABLES.BOOKINGS,
      Item: booking,
      // Prevent overwriting existing booking with same ID
      ConditionExpression: 'attribute_not_exists(id)',
    });

    await dynamoDbClient.send(command);

    console.log('Booking created successfully:', bookingId);
    return {
      success: true,
      bookingId,
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get a booking by ID
 */
export async function getBooking(bookingId: string): Promise<BookingDocument | null> {
  try {
    const command = new GetCommand({
      TableName: TABLES.BOOKINGS,
      Key: { id: bookingId },
    });

    const result = await dynamoDbClient.send(command);
    return (result.Item as BookingDocument) || null;
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  bookingId: string, 
  status: BookingDocument['status']
): Promise<boolean> {
  try {
    const command = new UpdateCommand({
      TableName: TABLES.BOOKINGS,
      Key: { id: bookingId },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': status,
        ':updatedAt': new Date().toISOString(),
      },
      // Only update if the booking exists
      ConditionExpression: 'attribute_exists(id)',
    });

    await dynamoDbClient.send(command);
    console.log('Booking status updated:', bookingId, status);
    return true;
  } catch (error) {
    console.error('Error updating booking status:', error);
    return false;
  }
}

/**
 * Get all bookings (with optional pagination)
 */
export async function getAllBookings(limit?: number): Promise<BookingDocument[]> {
  try {
    const command = new ScanCommand({
      TableName: TABLES.BOOKINGS,
      Limit: limit,
    });

    const result = await dynamoDbClient.send(command);
    return (result.Items as BookingDocument[]) || [];
  } catch (error) {
    console.error('Error getting all bookings:', error);
    return [];
  }
}

/**
 * Get bookings for a specific date
 */
export async function getBookingsForDate(date: string): Promise<BookingDocument[]> {
  try {
    const command = new QueryCommand({
      TableName: TABLES.BOOKINGS,
      IndexName: 'date-index',
      KeyConditionExpression: '#date = :date',
      ExpressionAttributeNames: {
        '#date': 'date',
      },
      ExpressionAttributeValues: {
        ':date': date,
      },
    });

    const result = await dynamoDbClient.send(command);
    return (result.Items as BookingDocument[]) || [];
  } catch (error) {
    console.error('Error getting bookings for date:', error);
    return [];
  }
}

/**
 * Get bookings by email
 */
export async function getBookingsByEmail(email: string): Promise<BookingDocument[]> {
  try {
    const command = new QueryCommand({
      TableName: TABLES.BOOKINGS,
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    });

    const result = await dynamoDbClient.send(command);
    return (result.Items as BookingDocument[]) || [];
  } catch (error) {
    console.error('Error getting bookings by email:', error);
    return [];
  }
}

/**
 * Delete a booking
 */
export async function deleteBooking(bookingId: string): Promise<boolean> {
  try {
    const command = new DeleteCommand({
      TableName: TABLES.BOOKINGS,
      Key: { id: bookingId },
      // Only delete if the booking exists
      ConditionExpression: 'attribute_exists(id)',
    });

    await dynamoDbClient.send(command);
    console.log('Booking deleted:', bookingId);
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
}

/**
 * Check if a time slot is available for a given date
 */
export async function isTimeSlotAvailable(date: string, time: string): Promise<boolean> {
  try {
    const bookings = await getBookingsForDate(date);
    const conflictingBooking = bookings.find(
      booking => booking.time === time && booking.status !== 'cancelled'
    );
    return !conflictingBooking;
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    return false;
  }
}
