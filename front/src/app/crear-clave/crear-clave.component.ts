import { Component } from "@angular/core";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ToastService } from "../toast/toast.service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-clave',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
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
  clavesNoCoinciden: boolean = false;


  generateRandomPassword() {
    const GRUPO_MAYUSCULA = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÉÓÚÍÜ";
    const GRUPO_MINUSCULA = "abcdefghijklmnopqrstuvwxyzñéóúíü";
    const GRUPO_NUMEROS = "0123456789";
    const GRUPO_ESPECIALES = "?-*!@#$/(){}=.,;:";

    const getRandomCharacter = (group: string) => {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return group.charAt(array[0] % group.length);
    };

    const getRandomCharacters = (group: string, count: number) => {
        let characters = '';
        for (let i = 0; i < count; i++) {
            characters += getRandomCharacter(group);
        }
        return characters;
    };

    const getRandomInt = (min: number, max: number) => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return Math.floor(array[0] / (0xFFFFFFFF + 1) * (max - min + 1)) + min;
    };

    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = getRandomInt(0, i);
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };

    const clave = getRandomCharacters(GRUPO_MAYUSCULA, getRandomInt(2, 4)) +
        getRandomCharacters(GRUPO_MINUSCULA, getRandomInt(2, 4)) +
        getRandomCharacters(GRUPO_NUMEROS, getRandomInt(2, 4)) +
        getRandomCharacters(GRUPO_ESPECIALES, getRandomInt(2, 4));

    const shuffledClave = shuffleArray(clave.split('')).join('');

    this.claveInput = shuffledClave;
    this.confirmarClave = shuffledClave;

    return shuffledClave;
  }
  constructor(private toastService: ToastService, private router: Router, private http: HttpClient) {} // Inject HttpClient

  onSubmit() {
    if (this.claveInput !== this.confirmarClave) {
      this.clavesNoCoinciden = true;
      this.showErrorToast();
      return;
    }
    this.clavesNoCoinciden = false;

    const postData = {
      nombre: this.nombreClave,
      clave: this.claveInput,
      pista: this.pista
    };


    this.http.post<{ response: any }>(environment.baseUrl +'api/caja/clave', postData).subscribe(
      (response: { response: any }) => {
          this.toastService.showSuccessToast("Se ha creado la clave");
          this.router.navigateByUrl("/elements");
          },
          (error: any) => {
          this.toastService.showErrorToast("Error al crear la clave");
          }
    );
  }

  showErrorToast() {
    this.toastService.showErrorToast('Las claves no coinciden');
  }
}
