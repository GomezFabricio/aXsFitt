import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList';
import NotFound from './pages/NotFound';
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate';
import VendedorDetail from './pages/vendedores/VendedorDetail/VendedorDetail';
import Navbar from './components/Navbar/Navbar';
import VendedoresInactivosList from './pages/vendedores/VendedoresInactivosList/VendedoresInactivosList';
import VendedorEdit from './pages/vendedores/VendedorEdit/VendedorEdit';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/login/Login/Login'; 
import './assets/styles/variables.css';
import './assets/styles/pages.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFound />} />

        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <VendedoresList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/create-vendedor'
          element={
            <ProtectedRoute>
              <VendedorCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path='/vendedor/:id'
          element={
            <ProtectedRoute>
              <VendedorDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path='/vendedores/inactivos'
          element={
            <ProtectedRoute>
              <VendedoresInactivosList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/vendedor/:id/edit'
          element={
            <ProtectedRoute>
              <VendedorEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
