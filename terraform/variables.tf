variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region"
}

variable "db_password" {
  description = "RDS user password"
  sensitive   = true
}
