import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList'
import NotFound from './pages/NotFound'
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate'
import VendedorDetail from './pages/vendedores/VendedorDetail/VendedorDetail'
import Navbar from './components/Navbar/Navbar'
import './assets/styles/variables.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<VendedoresList />} />
        <Route path='/create-vendedor' element={<VendedorCreate />} />
        <Route path="/vendedor/:id" element={<VendedorDetail />} />
      </Routes>

    </>
    
  )
}

export default App
