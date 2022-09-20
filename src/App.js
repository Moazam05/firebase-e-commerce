// React Imports
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// Custom Imports
import Home from './pages/views/Home';
import ProductInfo from './pages/views/Home/Components/ProductInfo';
import Cart from './pages/views/Cart';
import PageNotFound from './pages/PageNotFound';
import Orders from './pages/views/Orders';
import Admin from './pages/views/Admin';
import Loader from './shared/Loader';
// Import CSS
import './App.css';
// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Private Routes Imports
import { HomeLayout } from './hooks/HomeLayout';
import RequireAuth from './hooks/RequireAuth';
import AuthLayout from './context/AuthLayout';
import Unauthorized from './pages/Unauthorized';
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />
      <Routes>
        {/* Login */}
        <Route element={<HomeLayout />}>
          <Route
            path='/login'
            element={
              <Suspense fallback={<Loader color='#e0e0e0' />}>
                <Login />
              </Suspense>
            }
          />
        </Route>

        <Route path='/' element={<AuthLayout />}>
          <Route path='unauthorized' element={<Unauthorized />} />
          {/* Public Route */}
          <Route
            path='/register'
            element={
              <Suspense fallback={<Loader color='#e0e0e0' />}>
                <Register />
              </Suspense>
            }
          />

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
