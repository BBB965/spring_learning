import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/:id" element={<Product/>}/>
      </Routes>
    </div>
  )
}

export default App