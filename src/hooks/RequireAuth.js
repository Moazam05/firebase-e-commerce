// React Imports
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Context Provider
import { useAuth } from '../context/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  // Context
  const { user } = useAuth();

  return user &&
    user?.userRoles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.user ? (
    <Navigate to='/unauthorized' />
  ) : (
    <Navigate to='/login' />
  );
};

export default RequireAuth;
