output "ecr_url" {
  value       = aws_ecr_repository.repository.repository_url
  description = "The ECR repository URL"
}

output "aws_region" {
  value       = local.region
  description = "AWS region"
}
