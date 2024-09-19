import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import PlaceOrder from './Components/Placeorder/Placeorder'
import { useState } from 'react'
import Cart from './Pages/Cart/Cart'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify/verify'
import Myorders from './Pages/Myorders/Myorders'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // useNavigate hook for redirection

  const handleLogin = () => {
    // Simulate login success
    setIsLoggedIn(true);
    navigate('/');  // Redirect to home page after successful login
  };

  return (
    <>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/auth' element={<Login onLogin={handleLogin} />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<Myorders/>} />
      </Routes>
      
    </>
  );
}

export default App;
