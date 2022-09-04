// React Imports
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Context Provider
import { useAuth } from '../context/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  // Context
  const { user } = useAuth();

  return user && user?.user ? <Outlet /> : <Navigate to='/login' />;
};

export default RequireAuth;
