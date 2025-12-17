import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// AWS DynamoDB configuration
// Note: AWS_REGION is reserved in Amplify, so we use APP_AWS_REGION as fallback
const region = process.env.AWS_REGION || process.env.APP_AWS_REGION || 'us-east-1';

// Get credentials from environment variables (for Amplify SSR)
const accessKeyId = process.env.APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.APP_AWS_SECRET_ACCESS_KEY;

// Create DynamoDB client configuration
const clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = {
  region,
};

// Add explicit credentials if available (required for Amplify SSR)
if (accessKeyId && secretAccessKey) {
  clientConfig.credentials = {
    accessKeyId,
    secretAccessKey,
  };
}

// Create DynamoDB client
const client = new DynamoDBClient(clientConfig);

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
    process.env.AWS_REGION ||
    process.env.APP_AWS_ACCESS_KEY_ID
  );
}

// Export types for TypeScript
export type TableName = typeof TABLES[keyof typeof TABLES];
