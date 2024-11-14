// validation.js

export const validateNombre = (nombre) => {
    if (!nombre) {
      return 'El nombre es requerido';
    }
    return '';
  };
  
  export const validateApellido = (apellido) => {
    if (!apellido) {
      return 'El apellido es requerido';
    }
    return '';
  };
  
  export const validateDNI = (dni) => {
    if (!dni) {
      return 'El DNI es requerido';
    } else if (!/^\d{7,8}$/.test(dni)) {
      return 'El DNI debe tener entre 7 y 8 dígitos';
    }
    return '';
  };
  
  export const validateTelefono = (telefono) => {
    if (!telefono) {
      return 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(telefono)) {
      return 'El teléfono debe tener 10 dígitos';
    }
    return '';
  };
  
  export const validateFechaNacimiento = (fechaNacimiento) => {
    if (!fechaNacimiento) {
      return 'La fecha de nacimiento es requerida';
    }
    return '';
  };
  
  export const validateDomicilio = (domicilio) => {
    if (!domicilio) {
      return 'El domicilio es requerido';
    }
    return '';
  };
  
  export const validateEmail = (email) => {
    if (!email) {
      return 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return 'Email inválido';
    }
    return '';
  };
  
  export const validatePassword = (password) => {
    if (!password) {
      return 'La contraseña es requerida';
    }
    return '';
  };