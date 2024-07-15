locals {
  region = var.aws_region
  ecr = {
    repository_name = "cds-registry"
  }
}
