export interface Elemento {
  id: number;
  nombre: string;
  tipo: 'Tarjeta' | 'Identificación' | 'Login' | 'Secreto';
  notas: string;
  // Campos específicos de cada tipo
  // Tarjeta
  tarjeta?: {
    clave: string;
    numero: string;
    titular: string;
    ccv: string;
    direccion: string;
    telefono: string;
    fecha_venc: string;
  };
  // Identificación
  identificacion?: {
    numero: string;
    nombre: string;
    fecha_exp: string;
    fecha_venc: string;
    fecha_nacimiento: string;
  };
  // Login
  login?: {
    clave: string;
    email: string;
    usuario: string;
    url: string;
  };
  // Secreto
  secreto?:{
    clave: string;
    secreto: string;
  };
  checked?: boolean;
}
