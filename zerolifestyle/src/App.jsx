import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Navbar from "./components/Navbar"
import NotFound from './pages/NotFound';
import ProductDescription from './pages/ProductDescription';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDescription/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
<ToastContainer/>
    </>
  )
}

export default App
