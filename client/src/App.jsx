import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VendedoresList from './pages/vendedores/VendedoresList'
import NotFound from './pages/NotFound'
import VendedorCreate from './pages/vendedores/VendedorCreate'

function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/vendedores' element={<VendedoresList />} />
      <Route path='/create-vendedor' element={<VendedorCreate />} />
    </Routes>
  )
}

export default App
