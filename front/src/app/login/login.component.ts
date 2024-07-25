import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
        response => {
            sessionStorage.setItem('token', response.access_token);
            console.log('Login successful', response);
            // Manejar la respuesta del login exitoso, como guardar el token
        },
        error => {
            console.error('Login failed', error);
            // Manejar el error del login
        }
    );
}

}
