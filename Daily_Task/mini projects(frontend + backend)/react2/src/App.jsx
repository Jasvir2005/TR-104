import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Notfound from './pages/Notfound'
import Songs from './pages/Songs'
import HindiSongs from './pages/HindiSongs'
import English from './pages/English'
import Punjabi from './pages/Punjabi'
import SongLayout from './SongLayout'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/cart" element={<Cart/>} />

        {/*  <Route path="/songs" element={<Songs/>}/>
        <Route path="/songs/hindi" element={<HindiSongs/>}/>
        <Route path="/songs/english" element={<English/>}/>
        <Route path="/songs/punjabi" element={<Punjabi/>}/>  */}
        
        <Route path='/songs' element={<SongLayout/>} >

         <Route index element={<Songs/>}/>
         <Route path="hindi" element={<HindiSongs/>}/>
         <Route path="english" element={<English/>}/>
         <Route path="punjabi" element={<Punjabi/>}/>
        </Route>

        <Route path="*" element={<Notfound/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
