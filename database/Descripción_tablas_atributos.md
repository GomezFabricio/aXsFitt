# Descripción de Tablas y Atributos

Este archivo contiene la descripción de cada una de las tablas en el sistema y sus atributos.

## Tablas

### 1. `estado_vendedores`
Contiene los diferentes estados que puede tener un vendedor en el sistema.
- **estado_vendedor_id**: Identificador único del estado del vendedor.
- **estado_vendedor_nombre**: Nombre del estado del vendedor.

### 2. `personas`
Almacena la información básica de todas las personas del sistema (clientes, vendedores, etc.).
- **persona_id**: Identificador único de la persona.
- **persona_nombre**: Nombre de la persona.
- **persona_apellido**: Apellido de la persona.
- **persona_dni**: Documento Nacional de Identidad de la persona.
- **persona_fecha_nacimiento**: Fecha de nacimiento de la persona.
- **persona_domicilio**: Domicilio de la persona.
- **persona_telefono**: Número de teléfono de la persona.
- **persona_fecha_alta**: Fecha en la que la persona fue registrada en el sistema.

### 3. `marca_productos`
Contiene las diferentes marcas de productos.
- **marca_producto_id**: Identificador único de la marca del producto.
- **marca_producto_nombre**: Nombre de la marca.

### 4. `estados_afiliacion`
Define los distintos estados de afiliación de los clientes.
- **estado_afiliacion_id**: Identificador único del estado de afiliación.
- **estado_afiliacion_nombre**: Nombre del estado de afiliación.

### 5. `tipos_productos`
Lista los tipos de productos disponibles.
- **tipo_producto_id**: Identificador único del tipo de producto.
- **tipo_producto_nombre**: Nombre del tipo de producto.

### 6. `roles`
Define los roles que pueden tener los usuarios en el sistema.
- **rol_id**: Identificador único del rol.
- **rol_tipo_rol**: Nombre o tipo de rol (por ejemplo, Administrador, Vendedor, Cliente).

### 7. `usuarios`
Contiene la información de los usuarios del sistema.
- **usuario_id**: Identificador único del usuario.
- **persona_id**: Relación con la tabla `personas`, que identifica a la persona asociada al usuario.
- **usuario_email**: Correo electrónico del usuario.
- **usuario_pass**: Contraseña del usuario (en formato de texto plano).

### 8. `menu_opciones`
Define las opciones del menú de la aplicación para cada rol.
- **opcion_id**: Identificador único de la opción del menú.
- **rol_id**: Relación con la tabla `roles`, que define a qué rol pertenece la opción del menú.
- **opcion_nombre**: Nombre de la opción del menú.

### 9. `usuarios_roles`
Relaciona a los usuarios con sus roles correspondientes.
- **usuario_rol_id**: Identificador único de la relación usuario-rol.
- **usuario_id**: Relación con la tabla `usuarios`, que identifica al usuario.
- **rol_id**: Relación con la tabla `roles`, que identifica el rol asociado al usuario.

### 10. `vendedores`
Almacena la información de los vendedores.
- **vendedor_id**: Identificador único del vendedor.
- **estado_vendedor_id**: Relación con la tabla `estado_vendedores`, que identifica el estado del vendedor.
- **persona_id**: Relación con la tabla `personas`, que identifica a la persona asociada al vendedor.
- **vendedor_fecha_ingreso**: Fecha en la que el vendedor ingresó al sistema.

### 11. `productos`
Contiene la información de los productos.
- **producto_id**: Identificador único del producto.
- **tipo_producto_id**: Relación con la tabla `tipos_productos`, que identifica el tipo de producto.
- **marca_producto_id**: Relación con la tabla `marca_productos`, que identifica la marca del producto.
- **producto_descripcion**: Descripción breve del producto.
- **producto_codigo_barras**: Código de barras del producto.
- **producto_precio_costo**: Precio de costo del producto.
- **producto_incremento**: Incremento porcentual aplicado al precio de costo.
- **precio_venta**: Precio de venta al público.
- **precio_venta_afiliados**: Precio de venta con descuento para afiliados.

### 12. `clientes`
Almacena la información de los clientes y su estado de afiliación.
- **cliente_id**: Identificador único del cliente.
- **persona_id**: Relación con la tabla `personas`, que identifica a la persona asociada al cliente.
- **estado_afiliacion_id**: Relación con la tabla `estados_afiliacion`, que identifica el estado de afiliación del cliente.
- **cliente_fecha_afiliacion**: Fecha de afiliación del cliente.
- **cliente_fecha_baja_afiliacion**: Fecha en que el cliente dejó de ser afiliado.

### 13. `comisiones`
Registra las comisiones generadas por las ventas de los vendedores.
- **comision_id**: Identificador único de la comisión.
- **vendedor_id**: Relación con la tabla `vendedores`, que identifica al vendedor que generó la comisión.
- **comision_porcentaje**: Porcentaje de la comisión.
- **comision_fecha**: Fecha en la que se generó la comisión.
- **comision_monto**: Monto de la comisión en valor monetario.
- **comision_descripcion**: Descripción detallada de la comisión.

### 14. `inventario_principal`
Lleva el registro del inventario de productos en el almacén principal.
- **inventario_id**: Identificador único del inventario.
- **producto_id**: Relación con la tabla `productos`, que identifica el producto en el inventario.
- **inventario_cantidad**: Cantidad actual del producto en el inventario.
- **inventario_fecha_actualizacion**: Fecha de la última actualización del inventario.

### 15. `venta`
Almacena la información de las ventas realizadas.
- **venta_id**: Identificador único de la venta.
- **clientes_cliente_id**: Relación con la tabla `clientes`, que identifica al cliente que realizó la compra.
- **vendedor_id**: Relación con la tabla `vendedores`, que identifica al vendedor que realizó la venta.
- **venta_fecha**: Fecha en que se realizó la venta.
- **venta_total**: Monto total de la venta.

### 16. `detalle_venta`
Contiene los detalles de los productos vendidos en cada venta.
- **detalle_venta_id**: Identificador único del detalle de la venta.
- **productos_producto_id**: Relación con la tabla `productos`, que identifica el producto vendido.
- **venta_id**: Relación con la tabla `venta`, que identifica la venta en la que se incluyó el producto.
- **detalle_venta_cantidad**: Cantidad del producto vendido.
- **detalle_venta_precio_unitario**: Precio unitario del producto en la venta.
- **detalle_venta_subtotal**: Subtotal por cada línea de productos vendidos.

