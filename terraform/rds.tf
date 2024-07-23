resource "aws_db_instance" "prod" {
  allocated_storage        = 20
  engine                   = "postgres"
  engine_version           = "16.3"
  identifier               = "cajadb"
  instance_class           = "db.t3.micro"
  storage_encrypted        = false
  publicly_accessible      = true
  delete_automated_backups = true
  skip_final_snapshot      = true
  db_name                  = "cds"
  username                 = "cajauser"
  password                 = var.db_password
  apply_immediately        = true
  multi_az                 = false
}
