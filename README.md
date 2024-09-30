# aXsFitt - Sistema de Gestión para Venta de Suplementos

## Introducción

aXsFitt es un sistema de gestión diseñado para un emprendimiento de ventas de suplementos deportivos. Este sistema tiene como objetivo ofrecer una gestión integral que abarca diferentes áreas del negocio, incluyendo la administración de vendedores, la gestión de ventas, el control de inventario y stock de los vendedores, así como el registro y manejo de clientes.

El proyecto está siendo desarrollado utilizando **React** para el frontend y **Express** para el backend, aprovechando las ventajas que estas tecnologías ofrecen en entornos web modernos.

## Herramientas y Librerías Utilizadas

### Backend (Express)
- **cors** (`^2.8.5`): Permite configurar y gestionar las políticas de CORS (Cross-Origin Resource Sharing), lo que es esencial para manejar las solicitudes que el frontend realiza al backend desde dominios diferentes.
- **express** (`^4.19.2`): Un framework minimalista y flexible para Node.js, utilizado para construir el backend del sistema, gestionar las rutas y controlar las peticiones HTTP.
- **morgan** (`^1.10.0`): Middleware que ayuda a realizar un logging de las solicitudes HTTP, lo que es útil para el desarrollo y la depuración del sistema.
- **mysql2** (`^3.11.0`): Un cliente MySQL para Node.js que ofrece soporte para Promesas, utilizado para manejar la conexión y las consultas a la base de datos MySQL.
- **jsonwebtoken** (`^9.0.2`): Librería para crear y verificar tokens JSON Web, utilizada para la autenticación y autorización de usuarios en el sistema.

### Frontend (React)
- **axios** (`^1.7.5`): Librería utilizada para realizar solicitudes HTTP desde el frontend al backend, facilitando la comunicación y el manejo de datos.
- **formik** (`^2.4.6`): Librería que simplifica la creación y validación de formularios en React, facilitando el manejo del estado y la validación de datos.
- **react** (`^18.3.1`): La biblioteca base para construir la interfaz de usuario, permitiendo la creación de componentes reutilizables y el manejo del estado de la aplicación.
- **react-dom** (`^18.3.1`): Librería que trabaja en conjunto con React para renderizar los componentes en el DOM del navegador.
- **react-router-dom** (`^6.26.1`): Herramienta utilizada para la gestión de rutas en la aplicación, facilitando la navegación entre diferentes páginas y componentes.
- **react-search-input** (`^0.11.3`): Un componente de búsqueda para React que permite filtrar resultados de forma sencilla a través de un input.

## Desafíos y Aprendizajes

El desarrollo de este sistema ha representado un desafío considerable, ya que tanto los frameworks como las librerías seleccionadas son nuevas para los desarrolladores. Esto ha requerido una fase adicional de aprendizaje y capacitación en estas tecnologías, lo que ha afectado en cierta medida la velocidad de desarrollo.

A pesar de la falta de experiencia previa con estas herramientas, se optó por ellas debido a las ventajas que ofrecen, como la capacidad de construir aplicaciones web rápidas y eficientes, el soporte robusto de la comunidad, y la modularidad que permite un desarrollo más organizado y escalable.

## Estructura del Proyecto

El proyecto se divide en dos grandes partes:

### 1. Cliente (Frontend)
Esta carpeta contiene todo lo relacionado con la interfaz de usuario, incluyendo:
- **Componentes:** Creación de componentes reutilizables, como formularios y tarjetas.
- **Manejo de Rutas:** Utilización de `react-router-dom` para la navegación entre diferentes vistas.
- **Estilos:** Aplicación de estilos CSS a los componentes.
- **API:** Definición de las peticiones HTTP que interactúan con el servidor backend utilizando `axios`.

### 2. Servidor (Backend)
En esta carpeta se define la lógica del servidor, incluyendo:
- **Peticiones y Respuestas:** Configuración de las rutas y el manejo de las peticiones provenientes del frontend.
- **Configuración de la Base de Datos:** Gestión de la conexión con MySQL y la configuración de los puertos y permisos necesarios para la interacción con el frontend.
- **Controladores:** Definición de la lógica para el manejo de datos, incluyendo las consultas a la base de datos.

## Primera Entrega

### Backend:
- **personas.controller.js:** Manejo de las operaciones de alta y modificación de personas.
- **usuarios_roles.controller.js:** Asignación de roles a las cuentas de usuario.
- **usuarios.controller.js:** Creación de usuarios en el sistema.
- **vendedores.controller.js:** Contiene todos los métodos relacionados con el CRUD de vendedores, como listado, alta, baja lógica, modificación, reactivación, y listado por estado.

#### Rutas:
Las rutas están definidas para procesar las peticiones que provienen del frontend, conectando los diferentes controladores con el cliente.

### Frontend:
- **Pages:**
  - `VendedorCreate.jsx`: Página para la creación de nuevos vendedores.
  - `VendedorList.jsx`: Página para listar y gestionar los vendedores existentes.

- **Componentes:**
  - `Navbar.jsx`: Navbar provisional para la entrega de este módulo.
  - `FormularioPersona.jsx`: Componente de formulario para gestionar los datos de las personas.
  - `FormularioUsuario.jsx`: Componente de formulario para la creación de usuarios.
  - `VendedorCard.jsx`: Tarjeta que representa la información de cada vendedor.

- **APIs:**
  - Se implementaron solicitudes HTTP utilizando `axios` para interactuar con el backend, permitiendo la creación, modificación, y consulta de datos relacionados con los vendedores.

## Progreso Actual

Nos encontramos en la primera entrega del mes de septiembre y, al día de hoy (16/09), ya se ha terminado el módulo de vendedores. Se han agregado funcionalidades como la opción de desactivar un vendedor, listar vendedores desactivados, volver a darlos de alta, además del CRUD completo.

También se ha desarrollado el módulo de login, que permite a un usuario iniciar sesión y seleccionar un rol al momento de acceder al sistema. Dependiendo del rol que seleccione, las opciones del menú cambiarán para proporcionar diferentes accesos a funcionalidades específicas.

Además, se ha iniciado el desarrollo del módulo de clientes, que aún no se ha finalizado.

## Actualización del Proyecto

Actualmente, se está desarrollando el módulo de usuarios y clientes. El módulo de usuarios se encuentra en un 90% de su desarrollo aproximadamente, faltando solo la funcionalidad de actualización (update). El módulo de clientes se ha terminado.
