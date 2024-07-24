import { Component } from "@angular/core";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ToastService } from "../toast/toast.service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-create-clave',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,HttpClientModule,
    NgClass,
    CommonModule,
  ],
  templateUrl: './crear-clave.component.html',
  styleUrls: ['./crear-clave.component.css']
})


export class CrearClaveComponent {

  nombreClave: string = '';
  claveInput: string = '';
  confirmarClave: string = '';
  pista: string = '';

  private apiUrl = 'http://localhost:3000/CrearClave';

  generateRandomPassword() {
    const GRUPO_MAYUSCULA = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÉÓÚÍÜ";
    const GRUPO_MINUSCULA = "abcdefghijklmnopqrstuvwxyzñéóúíü";
    const GRUPO_NUMEROS = "0123456789";
    const GRUPO_ESPECIALES = "?-*!@#$/(){}=.,;:";

    const getRandomCharacter = (group: string) => {
      return group.charAt(Math.floor(Math.random() * group.length));
    };

    const getRandomCharacters = (group: string, count: number) => {
      let characters = '';
      for (let i = 0; i < count; i++) {
        characters += getRandomCharacter(group);
      }
      return characters;
    };

    const clave = getRandomCharacters(GRUPO_MAYUSCULA, Math.floor(Math.random() * 3) + 2) +
      getRandomCharacters(GRUPO_MINUSCULA, Math.floor(Math.random() * 3) + 2) +
      getRandomCharacters(GRUPO_NUMEROS, Math.floor(Math.random() * 3) + 2) +
      getRandomCharacters(GRUPO_ESPECIALES, Math.floor(Math.random() * 3) + 2);

    const shuffledClave = clave.split('').sort(() => Math.random() - 0.5).join('');


      this.claveInput = shuffledClave;
      this.confirmarClave = shuffledClave;

    return shuffledClave;
  }
  constructor(private toastService: ToastService, private router: Router, private http: HttpClient) {} // Inject HttpClient

  onSubmit() {
    if (this.nombreClave==null || this.claveInput==null || this.confirmarClave ==null|| this.pista==null) {
      this.toastService.showErrorToast("Todos los campos son obligatorios");
      return;
    }

    const postData = {
      nombreClave: this.nombreClave,
      clave: this.claveInput,
      confirmarClave: this.confirmarClave,
      pista: this.pista
    };


    this.http.post<{ response: any }>('http://localhost:3000/CrearClave', postData).subscribe(
      (response: { response: any }) => {
        this.toastService.showSuccessToast("Se ha creado la clave");
        this.router.navigateByUrl("/elements");
        },
        (error: any) => {
        this.toastService.showErrorToast("Error al crear la clave");
        }
    );
  }
}
