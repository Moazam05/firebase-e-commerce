/* eslint-disable array-callback-return */
// React Imports
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
// Icons Imports
import { FaBars } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoReorderFour } from 'react-icons/io5';
// Firebase Imports
import { collection, getDocs } from 'firebase/firestore';
// Firebase DB
import firebaseDB from '../firebaseConfig';
// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
// Context Provider
import { useAuth } from '../context/useAuth';
// Store Imports
import { getTotal, clearCart } from '../pages/views/Cart/Store';

const Header = () => {
  const dispatch = useDispatch();
  // Stores
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  // Context
  const { logout } = useAuth();

  // States
  const [name, setName] = useState();
  const [, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    dispatch(clearCart());
  };

  useEffect(() => {
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  // Local Storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userRoles = JSON.parse(localStorage.getItem('user'));
  const { email } = user?.user;

  // Getting Names From Firebase
  const getName = async () => {
    console.log(email);
    try {
      setLoading(true);
      const names = await getDocs(collection(firebaseDB, 'userName'));
      const namesArray = [];
      names.forEach((singleData) => {
        const obj = {
          id: singleData.id,
          ...singleData.data(),
        };
        namesArray.push(obj);
        setName(namesArray?.filter((item) => item?.email === email));
        localStorage.setItem(
          'userName',
          JSON.stringify(namesArray?.filter((item) => item?.email === email))
        );
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartStyle = {
    position: 'absolute',
    top: '-9px',
    left: '22px',
    color: '#fff',
    background: '#FF9F1A',
    borderRadius: '50%',
    padding: '0px 6px',
    fontSize: '12px',
  };

  const activeLink = 'nav-link fw-bold active';
  const normalLink = 'nav-link';

  const welcomeName = JSON.parse(localStorage.getItem('userName'));

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary shadow-lg p-2'>
      <div className='container-fluid'>
        <Link className='navbar-brand fw-bold' to='/'>
          Firebase E-Commerce
        </Link>
        <button
          className='navbar-toggler collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <FaBars color='white' />
        </button>
        <div className='navbar-collapse collapse' id='navbarColor01'>
          <ul className='navbar-nav ms-auto align-items-center mobile-nav'>
            <li className='nav-item'>
              {welcomeName?.map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  to='/'
                  key={index}
                >
                  <span>
                    <AiOutlineUser fontSize={20} className='ms-2 fw-bold' />
                  </span>{' '}
                  {item?.name}
                </NavLink>
              ))}
            </li>

            {userRoles?.userRoles?.map((item, index) => {
              if (item === 2022) {
                return (
                  <li className='nav-item' key={index}>
                    <NavLink
                      to='/admin'
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      <MdAdminPanelSettings
                        fontSize={20}
                        className='ms-2 fw-bold'
                      />{' '}
                      Admin
                    </NavLink>
                  </li>
                );
              }
            })}
            {userRoles?.userRoles?.map((item, index) => {
              if (item !== 2022) {
                return (
                  <li className='nav-item' key={index}>
                    <NavLink
                      to='/orders'
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      <IoReorderFour /> Orders
                    </NavLink>
                  </li>
                );
              }
            })}
            <li className='nav-item'>
              <Link className='nav-link' to='/' onClick={handleLogout}>
                Logout
              </Link>
            </li>
            <li
              className='nav-item d-flex position-relative'
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/cart')}
            >
              <AiOutlineShoppingCart
                color='white'
                fontSize={20}
                className='ms-2 fw-bold'
              />
              <div style={cartStyle}>{cart?.cartTotalQuantity}</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
