import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

// AWS DynamoDB configuration
// Note: AWS_REGION is reserved in Amplify, so we use APP_AWS_REGION as fallback
const region = process.env.AWS_REGION || process.env.APP_AWS_REGION || 'us-east-1';

// Cache for credentials to avoid repeated Secrets Manager calls
let credentialsCache: { accessKeyId: string; secretAccessKey: string } | null = null;

// Function to get credentials from AWS Secrets Manager
async function getCredentialsFromSecretsManager(): Promise<{ accessKeyId: string; secretAccessKey: string } | null> {
  if (credentialsCache) {
    return credentialsCache;
  }

  try {
    // Create Secrets Manager client
    const secretsClient = new SecretsManagerClient({ region });

    // Get credentials from Secrets Manager
    const command = new GetSecretValueCommand({
      SecretId: 'harles-web/aws-credentials',
    });

    const result = await secretsClient.send(command);

    if (result.SecretString) {
      const secrets = JSON.parse(result.SecretString);
      if (secrets.AWS_ACCESS_KEY_ID && secrets.AWS_SECRET_ACCESS_KEY) {
        credentialsCache = {
          accessKeyId: secrets.AWS_ACCESS_KEY_ID,
          secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY,
        };
        console.log('Successfully retrieved AWS credentials from Secrets Manager');
        return credentialsCache;
      }
    }
  } catch (error) {
    console.error('Failed to get credentials from Secrets Manager:', error);
  }

  return null;
}

// Function to create DynamoDB client with proper credentials
async function createDynamoDBClient(): Promise<DynamoDBDocumentClient> {
  // Try environment variables first (for local development and Amplify secrets)
  const envAccessKeyId = process.env.APP_AWS_ACCESS_KEY_ID;
  const envSecretAccessKey = process.env.APP_AWS_SECRET_ACCESS_KEY;

  let clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = { region };

  if (envAccessKeyId && envSecretAccessKey) {
    // Use environment variables (Amplify secrets)
    console.log('Using AWS credentials from Amplify environment variables');
    clientConfig.credentials = {
      accessKeyId: envAccessKeyId,
      secretAccessKey: envSecretAccessKey,
    };
  } else {
    // Try to get credentials from Secrets Manager
    const secretsCredentials = await getCredentialsFromSecretsManager();
    if (secretsCredentials) {
      clientConfig.credentials = secretsCredentials;
    } else {
      console.log('No explicit credentials found, using default credential chain');
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

// Create a singleton client instance
let clientInstance: DynamoDBDocumentClient | null = null;

// Initialize client synchronously for backward compatibility
function initializeClient(): DynamoDBDocumentClient {
  if (clientInstance) {
    return clientInstance;
  }

  // Try environment variables first (for local development and Amplify secrets)
  const envAccessKeyId = process.env.APP_AWS_ACCESS_KEY_ID;
  const envSecretAccessKey = process.env.APP_AWS_SECRET_ACCESS_KEY;

  let clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = { region };

  if (envAccessKeyId && envSecretAccessKey) {
    // Use environment variables (Amplify secrets)
    console.log('Using AWS credentials from Amplify environment variables');
    clientConfig.credentials = {
      accessKeyId: envAccessKeyId,
      secretAccessKey: envSecretAccessKey,
    };
  } else {
    console.log('No explicit credentials found, using default credential chain');
  }

  const client = new DynamoDBClient(clientConfig);
  clientInstance = DynamoDBDocumentClient.from(client);
  return clientInstance;
}

// Export for backward compatibility
export const dynamoDbClient = initializeClient();
