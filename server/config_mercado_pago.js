import loadMercadoPago from '@mercadopago/sdk-js';
await loadMercadoPago();
const mp = new window.MercadoPago('TEST-1e14982d-795f-4225-bcec-d39d758e60e1');

export default mp;