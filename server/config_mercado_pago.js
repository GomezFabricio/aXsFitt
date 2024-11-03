import { MercadoPagoConfig } from 'mercadopago/dist/mercadoPagoConfig.js';

// Crea una instancia de configuración de Mercado Pago con tu access_token
const mercadopago = new MercadoPagoConfig({
  accessToken: 'TU_ACCESS_TOKEN'
});

export default mercadopago;