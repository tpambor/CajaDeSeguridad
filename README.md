# Caja de seguridad
El propósito de este experimento es confirmar que la arquitectura TO-BE predefinida permite que la aplicación Caja de Seguridad, con su lógica de negocio implementada en Python, pueda escalar y manejar de manera eficiente la carga de trabajo esperada. Al mismo tiempo, el front-end se modernizará utilizando Angular. Dado el importante esfuerzo requerido para la implementación completa de la nueva arquitectura, hemos optado por un proceso de modernización iterativo. Este enfoque garantiza que el sistema heredado de Caja de Seguridad permanezca operativo mientras se integran progresivamente los nuevos componentes del front-end de Angular, reemplazando finalmente toda la interfaz de usuario (UI) por el nuevo front-end. 

## Tabla de Contenidos

1. [Integrantes](#integrantes)
2. [Descripción](#descripción)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Requisitos de Instalación](#requisitos-de-instalación)
5. [Arquitectura](#arquitectura)
6. [Estructura de Carpetas](#Estructura-de-Carpetas)


## Integrantes
| Nombre y apellidos | Correo|
| --- | --- |
| Camilo Ramírez Restrepo​ | c.ramirezr2@uniandes.edu.co |
| Leidy Viviana Osorio Jiménez​ | l.osorioj@uniandes.edu.co |
| Tim Ulf Pambor | t.pambor@uniandes.edu.co |
| Fredy Antonio Alarcón Fonseca a | f.alarconf@uniandes.edu.co |

## Sustentación
[Video Entrega]( )

## Descripción
En la aplicación Caja de Seguridad, la gestión de elementos (secretos) es una parte crucial del sistema. Esta gestión incluye la capacidad de listar y crear nuevos elementos y claves, asegurando que los usuarios puedan almacenar y recuperar su información confidencial de manera segura y eficiente. Actualmente, el sistema presenta un alto acoplamiento entre las distintas entidades, lo que dificulta su escalabilidad y mantenimiento. Por esta razón, la prioridad de modernización se centra en desacoplar la lógica de negocio del front-end, exponiendo el backend a través de endpoints API y modernizando el front-end utilizando Angular.  

 
## Tecnologías Utilizadas

- Docker + Docker Compose
- Python3
- Flask
- PostgreSQL
- Angular
- APIs REST con Flask
- gunicorn


## Requisitos de Instalación

1. Instalar Docker y Docker Compose
2. Clona este repositorio.
3. Ejecuta `docker compose build` para crear los diferentes contenedores
4. Ejecuta `docker compose up` para ejecutar la aplicación

## Arquitectura 
- Diagrama de componentes
  ![image](https://github.com/user-attachments/assets/207e813a-f00b-4b42-8c9c-14743e12558e)
- Diagrama de despliegue
  ![image](https://github.com/user-attachments/assets/d8e89db1-d3fe-4813-ac9f-ecae9e6e9d05)
- Infraestructura computacional y tecnología destino 
  ![image](https://github.com/user-attachments/assets/8d400b45-f1d0-4ca0-9a5e-47c8c35c865d)

    
## API REST
- /api/auth/login (POST): Inicia sesión en la aplicación web.
- /api/caja/secretos (GET): Lista todos los elementos creados.
- /api/caja/claves (GET): Lista todas las claves favoritas creadas
- /api/caja/clave (POST): Crea la clave favorita.

Consulta la documentación completa de la API aqui: 
- [Documentacion en Postman](https://documenter.getpostman.com/view/26749673/2sA3kaBykT)
- [Postman Collection](https://github.com/tpambor/CajaDeSeguridad/wiki/Caja-de-seguridad.postman_collection)

## Aplicación en ejecución 
https://lb-cds-1270030646.us-east-1.elb.amazonaws.com/ 

## Estructura de Carpetas

- auth: Microservicio de autenticación.
- front: Código fuente del frontend de la aplicación.
- src: Código fuente principal de la aplicación backend.
- terraform: Scripts de Terraform para la infraestructura.
- tests: Pruebas unitarias y de integración para el proyecto.

## Estructura de Carpetas
### Backend  
1. git clone [Caja de seguridad](https://github.com/tpambor/CajaDeSeguridad.git)]
2. cd  src 
3. python -m venv env
4. source env/bin/activate
5. pip install -r requirements-web.txt
6. flask run

### Angular 
1. git clone [Caja de seguridad](https://github.com/tpambor/CajaDeSeguridad.git)]
2. cd front
3. npm install
4. ng serve


 
