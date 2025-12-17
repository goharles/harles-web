# Terraform AWS Infrastructure for Harles Web

This Terraform configuration provisions AWS infrastructure for the Harles Web Next.js application.

## Architecture

- **AWS Amplify**: Hosts the Next.js application with automatic builds and deployments
- **DynamoDB**: NoSQL database for storing bookings and contacts data
- **Route 53**: DNS management for custom domain
- **ACM**: SSL/TLS certificate management
- **IAM**: Roles and policies for secure access
- **SSM Parameter Store**: Environment variable management

## Prerequisites

1. **AWS CLI configured** with appropriate credentials
2. **Terraform installed** (version >= 1.0)
3. **GitHub repository** with your Next.js application
4. **Route 53 hosted zone** for your domain (should already exist)

## Setup Instructions

### 1. Configure Variables

```bash
# Copy the example variables file
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
nano terraform.tfvars
```

Update the following variables:
- `github_repository`: Your GitHub repository URL
- `domain_name`: Your domain (harlesandassociates.com)
- `aws_region`: Your preferred AWS region

### 2. Initialize Terraform

```bash
terraform init
```

### 3. Plan the Deployment

```bash
terraform plan
```

### 4. Apply the Configuration

```bash
terraform apply
```

### 5. Connect GitHub Repository

After Terraform creates the Amplify app, you'll need to connect your GitHub repository:

1. Go to AWS Amplify Console
2. Find your app (harles-web)
3. Connect your GitHub repository
4. Configure build settings (already set in Terraform)

## Environment Variables

The following environment variables are automatically configured:

- `DYNAMODB_BOOKINGS_TABLE`: DynamoDB table name for bookings
- `DYNAMODB_CONTACTS_TABLE`: DynamoDB table name for contacts
- `AWS_REGION`: AWS region
- `NEXT_PUBLIC_BASE_URL`: Your domain URL

## Cost Estimation

With PAY_PER_REQUEST billing and expected low traffic:
- **Amplify**: ~$1-3/month for hosting
- **DynamoDB**: ~$0.25-1/month for storage and requests
- **Route 53**: ~$0.50/month for hosted zone
- **ACM**: Free
- **Total**: ~$2-5/month (well under $10 budget)

## Cleanup

To destroy all resources:

```bash
terraform destroy
```

## Troubleshooting

### Domain Validation Issues
If certificate validation fails, check that your Route 53 hosted zone is properly configured.

### Amplify Build Issues
Check the Amplify console for build logs if deployment fails.

### DynamoDB Access Issues
Verify that the IAM role has proper permissions for DynamoDB access.
