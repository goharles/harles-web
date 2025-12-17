# Outputs for Terraform configuration

output "amplify_app_id" {
  description = "Amplify App ID"
  value       = aws_amplify_app.main.id
}

output "amplify_app_arn" {
  description = "Amplify App ARN"
  value       = aws_amplify_app.main.arn
}

output "amplify_default_domain" {
  description = "Amplify default domain"
  value       = aws_amplify_app.main.default_domain
}

output "custom_domain" {
  description = "Custom domain URL"
  value       = "https://${var.domain_name}"
}

output "dynamodb_bookings_table_name" {
  description = "DynamoDB bookings table name"
  value       = aws_dynamodb_table.bookings.name
}

output "dynamodb_bookings_table_arn" {
  description = "DynamoDB bookings table ARN"
  value       = aws_dynamodb_table.bookings.arn
}

output "dynamodb_contacts_table_name" {
  description = "DynamoDB contacts table name"
  value       = aws_dynamodb_table.contacts.name
}

output "dynamodb_contacts_table_arn" {
  description = "DynamoDB contacts table ARN"
  value       = aws_dynamodb_table.contacts.arn
}

output "route53_zone_id" {
  description = "Route 53 hosted zone ID"
  value       = data.aws_route53_zone.main.zone_id
}

output "iam_role_arn" {
  description = "IAM role ARN for Amplify"
  value       = aws_iam_role.amplify_role.arn
}

output "ssm_parameters" {
  description = "SSM parameter names"
  value = {
    bookings_table = aws_ssm_parameter.dynamodb_bookings_table.name
    contacts_table = aws_ssm_parameter.dynamodb_contacts_table.name
    aws_region     = aws_ssm_parameter.aws_region.name
  }
}
