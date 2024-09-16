import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList';
import NotFound from './pages/NotFound';
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate';
import VendedorDetail from './pages/vendedores/VendedorDetail/VendedorDetail';
import Navbar from './components/Navbar/Navbar';
import VendedoresInactivosList from './pages/vendedores/VendedoresInactivosList/VendedoresInactivosList';
import VendedorEdit from './pages/vendedores/VendedorEdit/VendedorEdit';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/login/Login/Login';
import SeleccionRol from './pages/login/SeleccionRol/SeleccionRol';
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
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-vendedor"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedorCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedorDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedores/inactivos"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedoresInactivosList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor/:id/edit"
          element={
            <ProtectedRoute>
              <Navbar />
              <VendedorEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navbar /> {/* Navbar visible solo en rutas protegidas */}
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
