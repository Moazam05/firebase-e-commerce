// React Imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Custom Imports
import Home from './pages/views/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductInfo from './pages/views/Home/Components/ProductInfo';
import Cart from './pages/views/Cart';
import PageNotFound from './pages/PageNotFound';
import Orders from './pages/views/Orders';
import Admin from './pages/views/Admin';
// Import CSS
import './App.css';
// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Private Routes Imports
import { HomeLayout } from './hooks/HomeLayout';
import RequireAuth from './hooks/RequireAuth';
import AuthLayout from './context/AuthLayout';

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />
      <Routes>
        {/* Login */}
        <Route element={<HomeLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='/' element={<AuthLayout />}>
          {/* Public Route */}
          <Route path='/register' element={<Register />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={[1996, 2022]} />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1996]} />}>
            <Route path='/orders' element={<Orders />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2022]} />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1996, 2022]} />}>
            <Route path='/cart' element={<Cart />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1996, 2022]} />}>
            <Route path='/productinfo/:id' element={<ProductInfo />} />
          </Route>
        </Route>
        {/* 404 Page */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
