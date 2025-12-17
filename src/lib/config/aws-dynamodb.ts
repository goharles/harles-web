import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// AWS DynamoDB configuration
const region = process.env.AWS_REGION || 'us-east-1';

// Create DynamoDB client
const client = new DynamoDBClient({
  region,
  // In production on AWS, credentials are automatically provided
  // In development, you can use AWS CLI credentials or environment variables
});

// Create DynamoDB Document client for easier operations
export const dynamoDbClient = DynamoDBDocumentClient.from(client);

// Table names from environment variables
export const TABLES = {
  BOOKINGS: process.env.DYNAMODB_BOOKINGS_TABLE || 'harles-web-bookings',
  CONTACTS: process.env.DYNAMODB_CONTACTS_TABLE || 'harles-web-contacts',
} as const;

// Helper function to check if we're in AWS environment
export function isAWSEnvironment(): boolean {
  return !!(
    process.env.AWS_EXECUTION_ENV ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.AWS_REGION
  );
}

// Export types for TypeScript
export type TableName = typeof TABLES[keyof typeof TABLES];
