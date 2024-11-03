import mercadopago from 'mercadopago';

export const PORT = 4000;
export const SECRET_KEY = 'tu_secreto';

//mercadopago configuración

mercadopago.configurations.setAccessToken('YOUR_ACCESS_TOKEN');

export { mercadopago } 