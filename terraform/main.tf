# Terraform configuration for AWS infrastructure
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
}

# Data source for existing Route 53 hosted zone
data "aws_route53_zone" "main" {
  name         = var.domain_name
  private_zone = false
}

# Note: AWS Amplify automatically handles SSL/TLS certificates for custom domains
# No need to create ACM certificates manually

# DynamoDB table for bookings
resource "aws_dynamodb_table" "bookings" {
  name           = "${var.project_name}-bookings"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "date"
    type = "S"
  }

  global_secondary_index {
    name            = "email-index"
    hash_key        = "email"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "date-index"
    hash_key        = "date"
    projection_type = "ALL"
  }

  tags = {
    Name        = "${var.project_name}-bookings"
    Environment = var.environment
  }
}

# DynamoDB table for contacts
resource "aws_dynamodb_table" "contacts" {
  name           = "${var.project_name}-contacts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "email-index"
    hash_key        = "email"
    projection_type = "ALL"
  }

  tags = {
    Name        = "${var.project_name}-contacts"
    Environment = var.environment
  }
}

# IAM role for Amplify
resource "aws_iam_role" "amplify_role" {
  name = "${var.project_name}-amplify-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "amplify.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-amplify-role"
    Environment = var.environment
  }
}

# IAM policy for DynamoDB access
resource "aws_iam_policy" "dynamodb_policy" {
  name        = "${var.project_name}-dynamodb-policy"
  description = "Policy for DynamoDB access"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.bookings.arn,
          aws_dynamodb_table.contacts.arn,
          "${aws_dynamodb_table.bookings.arn}/index/*",
          "${aws_dynamodb_table.contacts.arn}/index/*"
        ]
      }
    ]
  })
}

# Attach DynamoDB policy to Amplify role
resource "aws_iam_role_policy_attachment" "amplify_dynamodb" {
  role       = aws_iam_role.amplify_role.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}

# Systems Manager parameters for environment variables
resource "aws_ssm_parameter" "dynamodb_bookings_table" {
  name  = "/${var.project_name}/DYNAMODB_BOOKINGS_TABLE"
  type  = "String"
  value = aws_dynamodb_table.bookings.name

  tags = {
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "dynamodb_contacts_table" {
  name  = "/${var.project_name}/DYNAMODB_CONTACTS_TABLE"
  type  = "String"
  value = aws_dynamodb_table.contacts.name

  tags = {
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "aws_region" {
  name  = "/${var.project_name}/AWS_REGION"
  type  = "String"
  value = var.aws_region

  tags = {
    Environment = var.environment
  }
}
