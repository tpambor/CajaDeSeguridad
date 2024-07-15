locals {
  region = var.aws_region
  ecr = {
    repository_name = "cd-registry"
  }
}
