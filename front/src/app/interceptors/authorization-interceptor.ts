import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verificar si la solicitud es para el proceso de inicio de sesión
    if (request.url.includes('/login')) {
      // Continuar con la solicitud original sin modificar
      return next.handle(request);
    }

    const modifiedRequest = request.clone({
      setHeaders: {
      //  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.aUBy49Fu4AApWiWtiqzDnUmHJ2veWWVKmW9lh67nDTA`,
      },
    });

    return next.handle(modifiedRequest);
  }
}
