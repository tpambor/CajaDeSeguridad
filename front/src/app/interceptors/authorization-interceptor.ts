import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('token');

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
