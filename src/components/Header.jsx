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
// Custom Imports
import Loader from '../shared/Loader';
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
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    dispatch(clearCart());
  };

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    userNameHandler(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // Local Storage
  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user?.user;

  // Match Name Function
  const userNameHandler = (em) => {
    const tempName = name;
    const result = tempName?.filter((item) => item.email === em);
    setUserName(result);
  };

  // Getting Names From Firebase
  const getName = async () => {
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
        setLoading(false);
      });
      setName(namesArray);
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
              {loading ? (
                <Loader />
              ) : (
                userName?.map((name, index) => (
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
                    {name?.name}
                  </NavLink>
                ))
              )}
            </li>

            <li className='nav-item'>
              <NavLink
                to='/admin'
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <MdAdminPanelSettings fontSize={20} className='ms-2 fw-bold' />{' '}
                Admin
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                to='/orders'
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <IoReorderFour /> Orders
              </NavLink>
            </li>
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
