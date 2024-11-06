import { MercadoPagoConfig } from 'mercadopago';

const mercadopago = new MercadoPagoConfig({
    accessToken: 'TEST-1273741858627121-110320-a07c982b52b13f4ba280d44e47b5fbe9-250056888',
    options: {
        timeout: 5000,
    },
});

export default mercadopago;