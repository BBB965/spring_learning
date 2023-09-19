import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import Carts from './components/Carts';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/:id" element={<Product/>}/>
        <Route path="/cart" element={<Carts />}/>
      </Routes>
    </div>
  )
}

export default App