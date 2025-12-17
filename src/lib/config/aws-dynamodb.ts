import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

// AWS DynamoDB configuration
// Note: AWS_REGION is reserved in Amplify, so we use APP_AWS_REGION as fallback
const region = process.env.AWS_REGION || process.env.APP_AWS_REGION || 'us-east-1';

// Cache for credentials to avoid repeated SSM calls
let credentialsCache: { accessKeyId: string; secretAccessKey: string } | null = null;

// Function to get credentials from SSM Parameter Store
async function getCredentialsFromSSM(): Promise<{ accessKeyId: string; secretAccessKey: string } | null> {
  if (credentialsCache) {
    return credentialsCache;
  }

  try {
    // Create SSM client with minimal permissions (uses IAM role if available)
    const ssmClient = new SSMClient({ region });

    // Get credentials from SSM Parameter Store
    const [accessKeyResult, secretKeyResult] = await Promise.all([
      ssmClient.send(new GetParameterCommand({
        Name: '/harles-web/AWS_ACCESS_KEY_ID',
        WithDecryption: true,
      })),
      ssmClient.send(new GetParameterCommand({
        Name: '/harles-web/AWS_SECRET_ACCESS_KEY',
        WithDecryption: true,
      })),
    ]);

    if (accessKeyResult.Parameter?.Value && secretKeyResult.Parameter?.Value) {
      credentialsCache = {
        accessKeyId: accessKeyResult.Parameter.Value,
        secretAccessKey: secretKeyResult.Parameter.Value,
      };
      return credentialsCache;
    }
  } catch (error) {
    console.error('Failed to get credentials from SSM:', error);
  }

  return null;
}

// Function to create DynamoDB client with proper credentials
async function createDynamoDBClient(): Promise<DynamoDBDocumentClient> {
  // Try environment variables first (for local development)
  const envAccessKeyId = process.env.APP_AWS_ACCESS_KEY_ID;
  const envSecretAccessKey = process.env.APP_AWS_SECRET_ACCESS_KEY;

  let clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = { region };

  if (envAccessKeyId && envSecretAccessKey) {
    // Use environment variables
    clientConfig.credentials = {
      accessKeyId: envAccessKeyId,
      secretAccessKey: envSecretAccessKey,
    };
  } else {
    // Try to get credentials from SSM Parameter Store
    const ssmCredentials = await getCredentialsFromSSM();
    if (ssmCredentials) {
      clientConfig.credentials = ssmCredentials;
    }
  }

  const client = new DynamoDBClient(clientConfig);
  return DynamoDBDocumentClient.from(client);
}

// Create DynamoDB Document client (will be initialized lazily)
let dynamoDbClientPromise: Promise<DynamoDBDocumentClient> | null = null;

export function getDynamoDbClient(): Promise<DynamoDBDocumentClient> {
  if (!dynamoDbClientPromise) {
    dynamoDbClientPromise = createDynamoDBClient();
  }
  return dynamoDbClientPromise;
}

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

// Legacy export for backward compatibility (deprecated - use getDynamoDbClient instead)
export const dynamoDbClient = {
  send: async (command: any) => {
    const client = await getDynamoDbClient();
    return client.send(command);
  }
};
