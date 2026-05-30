# Cafetería - Grupo 3

## Descripción del negocio
La cafetería "El Buen Gusto" es un emprendimiento dedicado a la venta de bebidas calientes, postres y platos del día, que busca modernizar su modelo de gestión mediante la implementación de un sistema informático integral. El propósito principal del proyecto es desarrollar una aplicación web completa que permita centralizar la administración de la cafetería, abarcando desde la gestión de productos y categorías hasta el registro de ventas y control de stock. El sistema ofrecerá una interfaz intuitiva para el personal autorizado de la cafetería. El personal podrá registrar ventas, consultar el catálogo de productos y revisar el historial de transacciones. Los administradores, por su parte, contarán con herramientas para agregar, editar o eliminar productos, verificar el stock, gestionar los datos de los clientes y revisar las ventas realizadas. Este proyecto busca mejorar la eficiencia operativa del negocio, reducir errores en el manejo de información y ofrecer una experiencia moderna y confiable al personal. A través de esta solución tecnológica, la cafetería "El Buen Gusto" aspira a digitalizar sus procesos, logrando un mayor control y una visión global del funcionamiento del negocio.

## Descripción del sistema
El sistema a desarrollar será una aplicación web completa, compuesta por un frontend, un backend y una base de datos.

El frontend se encargará de la presentación visual y la interacción con el usuario, utilizando Vue.js como framework principal, Bootstrap para los estilos y componentes visuales, y Axios para la comunicación con el backend.

El backend gestionará la lógica del negocio y la comunicación con la base de datos, empleando el framework NestJS con TypeORM, y JWT para la autenticación y autorización del personal.

La base de datos será implementada en PostgreSQL y administrada desde DBeaver, contendrá toda la información relevante del negocio, organizada de forma estructurada y segura.

El sistema será escalable y modular, siguiendo las convenciones y buenas prácticas del framework NestJS, que permitirá mantener la separación entre la lógica del negocio, la presentación y la gestión de datos.

## Base de datos
El nombre de la base de datos será: sis257_cafeteria_3

Esta base de datos almacenará la información esencial del sistema y se organizará en diferentes tablas relacionadas entre sí mediante claves primarias y foráneas. Las tablas tentativas son las siguientes:

### Tabla: categorias
Esta tabla almacenará las categorías que agrupan los productos de la cafetería, como Bebidas, Postres o Platos del día. Permitirá organizar el catálogo de productos de forma clara y estructurada.

Campos:
- *id* (INT, PK, autoincremental): Identificador único de la categoría.
- *nombre* (VARCHAR): Nombre de la categoría (Ej: Bebidas, Postres, Platos).
- *descripcion* (VARCHAR): Descripción opcional de la categoría.

### Tabla: productos
Contendrá los datos de los productos que ofrece la cafetería. Permitirá registrar cada ítem con sus características, precio y cantidad disponible en inventario.

Campos:
- *id* (INT, PK, autoincremental): Identificador único del producto.
- *nombre* (VARCHAR): Nombre del producto.
- *descripcion* (TEXT): Descripción del producto.
- *precio* (DECIMAL): Precio unitario del producto.
- *stock* (INT): Cantidad disponible en el inventario.
- *activo* (BOOLEAN): Indica si el producto está disponible para la venta.
- *categoriaId* (INT, FK): Referencia a la categoría del producto.

### Tabla: clientes
Esta tabla almacenará la información de los clientes registrados en la cafetería. Permitirá identificar a los clientes al momento de registrar una venta.

Campos:
- *id* (INT, PK, autoincremental): Identificador único del cliente.
- *nombre* (VARCHAR): Nombre completo del cliente.
- *ci* (VARCHAR): Carnet de identidad del cliente.
- *telefono* (VARCHAR): Número de teléfono de contacto.

### Tabla: ventas
La tabla de ventas registrará todas las transacciones realizadas en la cafetería. Estará relacionada con las tablas de clientes y usuarios, y permitirá conocer los detalles de cada operación comercial.

Campos:
- *id* (INT, PK, autoincremental): Identificador único de la venta.
- *fecha* (TIMESTAMP): Fecha y hora de la transacción.
- *total* (DECIMAL): Monto total de la venta.
- *observacion* (TEXT): Observación adicional sobre la venta (opcional).
- *clienteId* (INT, FK): Cliente asociado a la venta.
- *usuarioId* (INT, FK): Usuario del sistema que registró la venta.

### Tabla: detalle_ventas
Esta tabla almacenará el detalle de cada producto incluido en una venta. Estará relacionada con las tablas de ventas y productos, permitiendo conocer exactamente qué se vendió en cada transacción.

Campos:
- *id* (INT, PK, autoincremental): Identificador único del detalle.
- *cantidad* (INT): Cantidad del producto vendido.
- *precioUnitario* (DECIMAL): Precio del producto al momento de la venta.
- *subtotal* (DECIMAL): Resultado de cantidad multiplicado por precioUnitario.
- *ventaId* (INT, FK): Referencia a la venta correspondiente.
- *productoId* (INT, FK): Referencia al producto vendido.

### Tabla: usuarios
Esta tabla almacenará la información del personal autorizado para acceder al sistema. Permitirá controlar el acceso mediante autenticación con JWT.

Campos:
- *id* (INT, PK, autoincremental): Identificador único del usuario.
- *nombre* (VARCHAR): Nombre completo del usuario.
- *email* (VARCHAR): Correo electrónico utilizado para iniciar sesión.
- *password* (VARCHAR): Contraseña cifrada del usuario con bcrypt.
- *activo* (BOOLEAN): Indica si el usuario está habilitado en el sistema.
