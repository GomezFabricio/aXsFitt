import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList';
import NotFound from './pages/NotFound';
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate';
import VendedorDetail from './pages/vendedores/VendedorDetail/VendedorDetail';
import Navbar from './components/Navbar/Navbar';
import VendedoresInactivosList from './pages/vendedores/VendedoresInactivosList/VendedoresInactivosList';
import VendedorEdit from './pages/vendedores/VendedorEdit/VendedorEdit';
import Login from './pages/login/Login/Login';
import SeleccionRol from './pages/login/SeleccionRol/SeleccionRol';
import UsuariosList from './pages/usuarios/UsuariosList/UsuariosList';
import UsuariosInactivosList from "./pages/usuarios/UsuariosInactivosList/UsuariosInactivosList";
import Footer from './components/Footer/Footer';
import UsuariosCreate from './pages/usuarios/UsuariosCreate/UsuariosCreate';
import UsuarioEdit from './pages/usuarios/UsuariosEdit/UsuariosEdit';
import ProtectedRoute from './pages/ProtectedRoute';

import Inventario from './pages/inventario/Inventario/Inventario';
import MarcasProductos from './pages/inventario/MarcasProductos/MarcasProductos';
import Productos from './pages/inventario/Productos/Productos';
import TiposProductos from './pages/inventario/TiposProductos/TiposProductos';

import ClientesList from './pages/clientes/ClientesList/ClientesList';
import ClientesCreate from './pages/clientes/ClientesCreate/ClientesCreate';
import ClientesEdit from './pages/clientes/ClientesEdit/ClientesEdit';
import ClientesInactivosList from './pages/clientes/ClientesInactivosList/ClientesInactivosList';

import VentasHome from './pages/ventas/VentasHome/VentasHome';
import VentasList from './pages/ventas/VentasList/VentasList';
import RegistrarVenta from './pages/ventas/RegistrarVenta/RegistrarVenta';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/variables.css';
import './assets/styles/pages.css';

function App() {
  return (
    <>
      <Routes>
        
        {/* Redirigir la ruta raíz al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Página de selección de roles, protegida */}
        <Route
          path="/seleccion-rol"
          element={
            <ProtectedRoute>
              <SeleccionRol />
              <Footer />
            </ProtectedRoute>
          }
        />

        {/* Vistas protegidas */}
        <Route
          path="/vendedores"
          element={
            <ProtectedRoute>
              <Navbar /> {/* Navbar visible solo en rutas protegidas */}
              <VendedoresList />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-vendedor"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedorCreate />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedorDetail />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedores/inactivos"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedoresInactivosList />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor/:id/edit"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedorEdit />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Navbar />
              <UsuariosList />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/inactivos"
          element={
            <ProtectedRoute>
              <Navbar />
              <UsuariosInactivosList />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/alta"
          element={
            <ProtectedRoute>
              <Navbar />
              <UsuariosCreate />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/editar/:id" // Nueva ruta para editar usuario
          element={
            <ProtectedRoute>
              <Navbar />
              <UsuarioEdit />
              <Footer />
            </ProtectedRoute>
          }
        />

        {/* Rutas del módulo de inventario */}
        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <Navbar />
              <Inventario />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marcas-productos"
          element={
            <ProtectedRoute>
              <Navbar />
              <MarcasProductos />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Navbar />
              <Productos />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tipos-productos"
          element={
            <ProtectedRoute>
              <Navbar />
              <TiposProductos />
              <Footer />
            </ProtectedRoute>
          }
        />

        {/* Rutas del módulo de clientes */}
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Navbar />
              <ClientesList />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes/alta"
          element={
            <ProtectedRoute>
              <Navbar />
              <ClientesCreate />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes/editar/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <ClientesEdit />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes/inactivos"
          element={
            <ProtectedRoute>
              <Navbar />
              <ClientesInactivosList />
              <Footer />
            </ProtectedRoute>
          }
        />

        {/* Rutas del módulo de ventas */}
        <Route
          path="/ventas"
          element={
            <ProtectedRoute>
              <Navbar />
              <VentasHome />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventas/listado"
          element={
            <ProtectedRoute>
              <Navbar />
              <VentasList />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventas/registrar"
          element={
            <ProtectedRoute>
              <Navbar />
              <RegistrarVenta />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registrar-venta"
          element={
            <ProtectedRoute>
              <Navbar />
              <RegistrarVenta />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-ventas"
          element={
            <ProtectedRoute>
              <Navbar />
              <VentasList />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navbar /> {/* Navbar visible solo en rutas protegidas */}
              <NotFound />
              <Footer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;