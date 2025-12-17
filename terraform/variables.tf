# Variables for Terraform configuration

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "harles-web"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "harlesandassociates.com"
}

variable "github_repository" {
  description = "GitHub repository URL"
  type        = string
  # You'll need to update this with your actual GitHub repo
  default     = "https://github.com/yourusername/harles_web"
}

variable "git_branch" {
  description = "Git branch to deploy"
  type        = string
  default     = "main"
}

# Optional: Add these if you want to customize DynamoDB settings
variable "dynamodb_billing_mode" {
  description = "DynamoDB billing mode"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "enable_point_in_time_recovery" {
  description = "Enable point-in-time recovery for DynamoDB"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    Project     = "harles-web"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
