import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.aUBy49Fu4AApWiWtiqzDnUmHJ2veWWVKmW9lh67nDTA';

    // Verificar si la solicitud es para el proceso de inicio de sesión
    if (req.url.includes('/login')) {
      // Continuar con la solicitud original sin modificar
      return next(req);
    }

  // Agrega encabezado de autorización con el token JWT
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // Continua con con la cabecera actualizada
  return next(authReq);
};
