import React from 'react';
import { Routes, BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/LogIn/Login';
import Register from './pages/createuser/register';

const App = () => {
  return (
    <div>
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hotels' element={<List />} />
            <Route path='/hotels/:id' element={<Hotel />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
         </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
