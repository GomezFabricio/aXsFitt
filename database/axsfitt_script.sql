CREATE TABLE menu_opciones (
  menu_opcion_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  menu_opcion_nombre VARCHAR(50)  NULL    ,
PRIMARY KEY(menu_opcion_id));



CREATE TABLE marca_productos (
  marca_producto_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  marca_producto_nombre VARCHAR(50)  NULL    ,
PRIMARY KEY(marca_producto_id));



CREATE TABLE estado_vendedores (
  estado_vendedor_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  estado_vendedor_nombre VARCHAR(20)  NULL    ,
PRIMARY KEY(estado_vendedor_id));



CREATE TABLE metodo_pago (
  metodo_pago_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  metodo_pago_nombre VARCHAR(50)  NULL    ,
PRIMARY KEY(metodo_pago_id));



CREATE TABLE tipos_productos (
  tipo_producto_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  tipo_producto_nombre VARCHAR(50)  NULL    ,
PRIMARY KEY(tipo_producto_id));



CREATE TABLE roles (
  rol_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  rol_tipo_rol VARCHAR(20)  NULL    ,
PRIMARY KEY(rol_id));



CREATE TABLE personas (
  persona_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  persona_nombre VARCHAR(40)  NULL  ,
  persona_apellido VARCHAR(40)  NULL  ,
  persona_dni VARCHAR(10)  NULL  ,
  persona_fecha_nacimiento DATE  NULL  ,
  persona_domicilio VARCHAR(255)  NULL  ,
  persona_telefono VARCHAR(20)  NULL  ,
  persona_fecha_alta DATE  NULL    ,
PRIMARY KEY(persona_id));



CREATE TABLE estados_usuarios (
  estado_usuario_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  estado_usuario_nombre VARCHAR(50)  NULL    ,
PRIMARY KEY(estado_usuario_id));



CREATE TABLE estados_afiliacion (
  estado_afiliacion_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  estado_afiliacion_nombre VARCHAR(20)  NULL    ,
PRIMARY KEY(estado_afiliacion_id));



CREATE TABLE configuracion_desc_afiliado (
  configuracion_desc_afiliado_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  configuracion_desc_afiliado_porcentaje DECIMAL(5,2)  NULL    ,
PRIMARY KEY(configuracion_desc_afiliado_id));



CREATE TABLE estados_comisiones (
  estado_comision_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  estado_comision_nombre VARCHAR(50)  NULL    ,
PRIMARY KEY(estado_comision_id));



CREATE TABLE usuarios (
  usuario_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  estado_usuario_id INTEGER UNSIGNED  NOT NULL  ,
  persona_id INTEGER UNSIGNED  NOT NULL  ,
  usuario_email VARCHAR(50)  NULL  ,
  usuario_pass VARCHAR(255)  NULL    ,
PRIMARY KEY(usuario_id)  ,
INDEX usuarios_FKIndex1(persona_id)  ,
INDEX usuarios_FKIndex2(estado_usuario_id),
  FOREIGN KEY(persona_id)
    REFERENCES personas(persona_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(estado_usuario_id)
    REFERENCES estados_usuarios(estado_usuario_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE clientes (
  cliente_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  persona_id INTEGER UNSIGNED  NOT NULL  ,
  estado_afiliacion_id INTEGER UNSIGNED  NOT NULL  ,
  cliente_fecha_afiliacion DATE  NULL  ,
  cliente_fecha_baja_afiliacion DATE  NULL    ,
PRIMARY KEY(cliente_id)  ,
INDEX clientes_FKIndex1(estado_afiliacion_id)  ,
INDEX clientes_FKIndex2(persona_id),
  FOREIGN KEY(estado_afiliacion_id)
    REFERENCES estados_afiliacion(estado_afiliacion_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(persona_id)
    REFERENCES personas(persona_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE usuarios_roles (
  usuario_rol_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  usuario_id INTEGER UNSIGNED  NOT NULL  ,
  rol_id INTEGER UNSIGNED  NOT NULL    ,
PRIMARY KEY(usuario_rol_id)  ,
INDEX usuarios_roles_FKIndex1(rol_id)  ,
INDEX usuarios_roles_FKIndex2(usuario_id),
  FOREIGN KEY(rol_id)
    REFERENCES roles(rol_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(usuario_id)
    REFERENCES usuarios(usuario_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE vendedores (
  vendedor_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  estado_vendedor_id INTEGER UNSIGNED  NOT NULL  ,
  persona_id INTEGER UNSIGNED  NOT NULL  ,
  vendedor_fecha_ingreso DATE  NOT NULL  ,
  vendedor_comision_porcentaje DECIMAL(5,2)  NULL    ,
PRIMARY KEY(vendedor_id)  ,
INDEX vendedores_FKIndex1(persona_id)  ,
INDEX vendedores_FKIndex2(estado_vendedor_id),
  FOREIGN KEY(persona_id)
    REFERENCES personas(persona_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(estado_vendedor_id)
    REFERENCES estado_vendedores(estado_vendedor_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE menu_roles (
  menu_roles_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  menu_opcion_id INTEGER UNSIGNED  NOT NULL  ,
  rol_id INTEGER UNSIGNED  NOT NULL    ,
PRIMARY KEY(menu_roles_id)  ,
INDEX menu_roles_FKIndex1(rol_id)  ,
INDEX menu_roles_FKIndex2(menu_opcion_id),
  FOREIGN KEY(rol_id)
    REFERENCES roles(rol_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(menu_opcion_id)
    REFERENCES menu_opciones(menu_opcion_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE comisiones (
  comision_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  vendedor_id INTEGER UNSIGNED  NOT NULL  ,
  estado_comision_id INTEGER UNSIGNED  NOT NULL  ,
  comision_fecha DATE  NULL  ,
  comision_monto DECIMAL(10,2)  NULL  ,
  comision_descripcion VARCHAR(200)  NULL    ,
PRIMARY KEY(comision_id)  ,
INDEX comisiones_FKIndex1(estado_comision_id)  ,
INDEX comisiones_FKIndex2(vendedor_id),
  FOREIGN KEY(estado_comision_id)
    REFERENCES estados_comisiones(estado_comision_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(vendedor_id)
    REFERENCES vendedores(vendedor_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE productos (
  producto_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  tipo_producto_id INTEGER UNSIGNED  NOT NULL  ,
  marca_producto_id INTEGER UNSIGNED  NOT NULL  ,
  producto_descripcion VARCHAR(60)  NULL  ,
  producto_codigo_barras VARCHAR(100)  NULL    ,
PRIMARY KEY(producto_id)  ,
INDEX productos_FKIndex1(tipo_producto_id)  ,
INDEX productos_FKIndex2(marca_producto_id),
  FOREIGN KEY(tipo_producto_id)
    REFERENCES tipos_productos(tipo_producto_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(marca_producto_id)
    REFERENCES marca_productos(marca_producto_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE inventario_principal (
  inventario_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  producto_id INTEGER UNSIGNED  NOT NULL  ,
  inventario_cantidad INTEGER UNSIGNED  NULL  ,
  inventario_fecha_actualizacion DATE  NULL  ,
  inventario_precio_costo DECIMAL(10,2)  NULL  ,
  inventario_incremento DECIMAL  NULL  ,
  inventario_precio_venta DECIMAL(10,2)  NULL  ,
  inventario_precio_afiliado DECIMAL(10,2)  NULL    ,
PRIMARY KEY(inventario_id)  ,
INDEX inventario_principal_FKIndex1(producto_id),
  FOREIGN KEY(producto_id)
    REFERENCES productos(producto_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE ventas (
  ventas_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  cliente_id INTEGER UNSIGNED  NULL  ,
  vendedor_id INTEGER UNSIGNED  NOT NULL  ,
  venta_fecha DATE  NULL  ,
  venta_total DECIMAL(10,2)  NULL    ,
PRIMARY KEY(ventas_id)  ,
INDEX venta_FKIndex1(vendedor_id)  ,
INDEX venta_FKIndex2(cliente_id),
  FOREIGN KEY(vendedor_id)
    REFERENCES vendedores(vendedor_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(cliente_id)
    REFERENCES clientes(cliente_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE detalle_venta (
  detalle_venta_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  ventas_id INTEGER UNSIGNED  NOT NULL  ,
  inventario_id INTEGER UNSIGNED  NOT NULL  ,
  detalle_venta_cantidad INTEGER UNSIGNED  NULL  ,
  detalle_venta_precio_unitario DECIMAL(10,2)  NULL  ,
  detalle_venta_subtotal DECIMAL(10,2)  NULL    ,
PRIMARY KEY(detalle_venta_id)  ,
INDEX detalle_venta_FKIndex1(ventas_id)  ,
INDEX detalle_venta_FKIndex2(inventario_id),
  FOREIGN KEY(ventas_id)
    REFERENCES ventas(ventas_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(inventario_id)
    REFERENCES inventario_principal(inventario_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE comprobantes (
  comprobante_id INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  ventas_id INTEGER UNSIGNED  NOT NULL  ,
  metodo_pago_id INTEGER UNSIGNED  NOT NULL  ,
  comprobante_url VARCHAR(255)  NULL  ,
  comprobante_fecha DATE  NULL  ,
  comprobante_monto DECIMAL(10,2)  NULL    ,
PRIMARY KEY(comprobante_id)  ,
INDEX comprobantes_FKIndex1(metodo_pago_id)  ,
INDEX comprobantes_FKIndex2(ventas_id),
  FOREIGN KEY(metodo_pago_id)
    REFERENCES metodo_pago(metodo_pago_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(ventas_id)
    REFERENCES ventas(ventas_id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);




