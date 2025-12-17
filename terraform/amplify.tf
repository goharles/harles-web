# AWS Amplify App
resource "aws_amplify_app" "main" {
  name       = var.project_name
  repository = var.github_repository

  # Build settings for Next.js
  build_spec = <<-EOT
    version: 1
    applications:
      - frontend:
          phases:
            preBuild:
              commands:
                - npm ci
            build:
              commands:
                - npm run build
          artifacts:
            baseDirectory: .next
            files:
              - '**/*'
          cache:
            paths:
              - node_modules/**/*
        appRoot: .
  EOT

  # Environment variables
  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "."
    AMPLIFY_DIFF_DEPLOY       = "false"
    _LIVE_UPDATES             = jsonencode([{
      pkg     = "next"
      type    = "npm"
      version = "latest"
    }])
  }

  # Custom rules for Next.js routing
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>"
    status = "200"
    target = "/index.html"
  }

  # Platform settings
  platform = "WEB_COMPUTE"

  # IAM role
  iam_service_role_arn = aws_iam_role.amplify_role.arn

  tags = {
    Name        = var.project_name
    Environment = var.environment
  }
}

# Amplify branch (main/production)
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.main.id
  branch_name = var.git_branch

  # Environment variables for the branch
  environment_variables = {
    NEXT_PUBLIC_BASE_URL           = "https://${var.domain_name}"
    DYNAMODB_BOOKINGS_TABLE        = aws_dynamodb_table.bookings.name
    DYNAMODB_CONTACTS_TABLE        = aws_dynamodb_table.contacts.name
    AWS_REGION                     = var.aws_region
    NODE_ENV                       = "production"
  }

  # Enable auto build
  enable_auto_build = true

  tags = {
    Name        = "${var.project_name}-${var.git_branch}"
    Environment = var.environment
  }
}

# Custom domain for Amplify
# Note: Amplify automatically provisions and manages SSL certificates
resource "aws_amplify_domain_association" "main" {
  app_id      = aws_amplify_app.main.id
  domain_name = var.domain_name

  # Main domain
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # WWW subdomain
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}

# Note: Amplify automatically manages DNS records for custom domains
# when using the aws_amplify_domain_association resource.
# The domain association will provide instructions for DNS configuration
# if manual setup is needed.
