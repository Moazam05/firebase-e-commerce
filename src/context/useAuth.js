// React Imports
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// Custom Imports
import { useLocalStorage } from './useLocalStorage';
// React Toastify
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    toast.success('Login Successfully');
    navigate('/', { replace: true });
  };

  const logout = () => {
    setUser(null);
    toast.error('Logout Successfully');
    localStorage.removeItem('cartItems');
    navigate('/login', { replace: true });
  };

  const registerUser = () => {
    toast.success('Registration Successfully');
    navigate('/login', { replace: true });
  };

  const orders = () => {
    toast.success('Order Placed Successfully');
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const editOrder = () => {
    toast.success('Update Product Successfully');
    setTimeout(() => {
      window.location.href = '/admin';
    }, 2000);
  };

  const addProduct = () => {
    toast.success('Add Product Successfully');
    setTimeout(() => {
      window.location.href = '/admin';
    }, 2000);
  };

  const deleteProduct = () => {
    toast.success('Delete Product Successfully');
    setTimeout(() => {
      window.location.href = '/admin';
    }, 2000);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      orders,
      registerUser,
      editOrder,
      addProduct,
      deleteProduct,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
