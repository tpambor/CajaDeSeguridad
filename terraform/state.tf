terraform {
  backend "s3" {
    bucket = "cds-state-dev"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}
