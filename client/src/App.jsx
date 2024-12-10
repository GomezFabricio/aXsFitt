import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList';
import NotFound from './pages/NotFound';
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate';
import VendedorDetail from './pages/vendedores/VendedorDetail/VendedorDetail';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header'; // Importar el componente Header
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

import MiPerfil from './pages/MiPerfil/MiPerfil'; // Importar la página Mi Perfil
import RequestPasswordReset from './pages/RequestPasswordReset/RequestPasswordReset'; // Importar la página de solicitud de recuperación de contraseña
import ResetPassword from './pages/ResetPassword/ResetPassword'; // Importar la página de restablecimiento de contraseña

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

        {/* Página de solicitud de recuperación de contraseña */}
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />

        {/* Página de restablecimiento de contraseña */}
        <Route path="/reset-password" element={<ResetPassword />} />

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
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VendedoresList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-vendedor"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VendedorCreate /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor/:id"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VendedorDetail /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedores/inactivos"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VendedoresInactivosList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor/:id/edit"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VendedorEdit /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <UsuariosList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/inactivos"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <UsuariosInactivosList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/alta"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <UsuariosCreate /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/editar/:id" // Nueva ruta para editar usuario
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <UsuarioEdit /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Rutas del módulo de inventario */}
        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <Inventario /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/marcas-productos"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <MarcasProductos /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <Productos /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tipos-productos"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <TiposProductos /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Rutas del módulo de clientes */}
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <ClientesList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes/alta"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <ClientesCreate /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes/editar/:id"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <ClientesEdit /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes/inactivos"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <ClientesInactivosList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Rutas del módulo de ventas */}
        <Route
          path="/ventas"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VentasHome /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventas/listado"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VentasList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventas/registrar"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <RegistrarVenta /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/registrar-venta"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <RegistrarVenta /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-ventas"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <VentasList /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Ruta para "Mi Perfil" */}
        <Route
          path="/mi-perfil"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <MiPerfil /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Navbar /> {/* Menú lateral fijo */}
                <div className="flex-1 flex flex-col overflow-auto"> 
                  <Header /> {/* Header */}
                  <NotFound /> {/* Contenido principal */}
                  <Footer /> {/* Pie de página */}
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;