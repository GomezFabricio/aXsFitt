import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList';
import NotFound from './pages/NotFound';
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate';
import VendedorDetail from './pages/vendedores/VendedorDetail/VendedorDetail';
import ClientesList from './pages/clientes/ClientesList/ClientesList';
import ClientesCreate from './pages/clientes/ClientesCreate/ClientesCreate';
import ClientesDetail from './pages/clientes/ClientesDetail/ClientesDetail';
import ClientesEdit from './pages/clientes/ClientesEdit/ClientesEdit';
import Navbar from './components/Navbar/Navbar';
import NavbarClientes from './components/NavbarClientes/NavbarClientes';
import './assets/styles/variables.css';
import './assets/styles/pages.css';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Condicional para renderizar el navbar según la ruta */}
      {location.pathname.startsWith('/clientes') ? <NavbarClientes /> : <Navbar />}
      
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<VendedoresList />} />
        <Route path='/create-vendedor' element={<VendedorCreate />} />
        <Route path='/vendedor/:id' element={<VendedorDetail />} />
        
        {/* Rutas para Clientes */}
        <Route path='/clientes' element={<ClientesList />} />
        <Route path='/clientes/create' element={<ClientesCreate />} />
        <Route path='/clientes/:id' element={<ClientesDetail />} />
        <Route path='/clientes/edit/:id' element={<ClientesEdit />} />
      </Routes>
    </>
  );
}

export default App;
