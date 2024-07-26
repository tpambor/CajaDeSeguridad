import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Elemento } from './elemento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {
  private apiUrl = environment.baseUrl + 'api/caja/secretos';
  
  constructor(private http: HttpClient) { }

  getElementos(): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(this.apiUrl);
  }
}
