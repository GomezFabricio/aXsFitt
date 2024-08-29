import axios from 'axios'

const createVendedorRequest = async (vendedor) => 
    await axios.post('http://localhost:4000/vendedores', vendedor)
