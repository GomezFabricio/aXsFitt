import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList'
import NotFound from './pages/NotFound'
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<VendedoresList />} />
        <Route path='/create-vendedor' element={<VendedorCreate />} />
      </Routes>

    </>
    
  )
}

export default App
