// React Imports
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Custom Imports
import Layout from '../../../components/Layout';
import CartModal from './Components/CartModal';
// Icons Imports
import { BsTrash, BsArrowRight, BsArrowLeft, BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import './Components/Cart.css';
// React Toastify
import { toast } from 'react-toastify';
// Store Imports
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart,
  getTotal,
} from './Store/index';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error(`Cart is Empty`);
  };

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <div className='card' style={{ width: '100%' }}>
              <>
                <div className='container padding-bottom-3x mb-1'>
                  <div className='table-responsive shopping-cart'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th className='text-center'>Price</th>
                          <th className='text-center'>Quantity</th>
                          <th className='text-center'>Total</th>
                          <th className='text-center'>
                            <button
                              className='btn btn-sm btn-outline-secondary'
                              onClick={handleClearCart}
                              disabled={cart?.cartItems?.length < 1}
                            >
                              Clear Cart
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.cartItems.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className='product-item'>
                                <div className='product-thumb'>
                                  <img src={item?.image} alt='Product' />
                                </div>
                                <div className='product-info'>
                                  <h4 className='product-title mt-3'>
                                    <div>{item?.title.substring(0, 19)}</div>
                                  </h4>

                                  <span>
                                    <em>Category:</em> {item?.category}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className='text-center text-lg text-medium'>
                              ${item?.price}
                            </td>
                            <td className='text-center'>
                              <div className='count-input'>
                                <div className='d-flex flex-row align-items-center icon gap-3 justify-content-center'>
                                  <button
                                    className='fw-bold border-0'
                                    style={{
                                      color: '#888888',
                                      background: 'transparent',
                                    }}
                                    onClick={() => handleDecreaseQuantity(item)}
                                  >
                                    <BiMinus fontSize={20} />
                                  </button>
                                  <div>
                                    <div className='text-center text-lg text-medium'>
                                      {item?.cartQuantity}
                                    </div>
                                  </div>
                                  <button
                                    className='fw-bold border-0'
                                    style={{
                                      color: '#888888',
                                      background: 'transparent',
                                    }}
                                    onClick={() => handleIncreaseQuantity(item)}
                                  >
                                    <BsPlus fontSize={21} />
                                  </button>
                                </div>
                              </div>
                            </td>

                            <td className='text-center text-lg text-medium'>
                              ${item?.price * item?.cartQuantity}
                            </td>
                            <td className='text-center text-secondary'>
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRemoveFromCart(item)}
                              >
                                <BsTrash fontSize={18} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className='shopping-cart-footer'>
                    <div
                      className='column'
                      style={{ textDecoration: 'underline' }}
                    >
                      <Link className='text-body continue' to='/'>
                        <span>
                          <BsArrowLeft className='me-2' />
                        </span>
                        Continue Shopping
                      </Link>
                    </div>
                    <div className='column text-lg'>
                      Subtotal:{' '}
                      <span className='text-medium'>
                        ${cart?.cartTotalAmount}
                      </span>
                    </div>
                  </div>
                  <div className='shopping-cart-footer'>
                    <div className='column'>
                      <button
                        type='button'
                        data-bs-toggle='modal'
                        data-bs-target='#cartModal'
                        className='add-to-cart btn btn-default btn-sm'
                        disabled={cart?.cartItems?.length < 1}
                      >
                        <div className='d-flex justify-content-between'>
                          <span>
                            Checkout <BsArrowRight className='ms-2' />
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div className='col-md-1'></div>
          </div>
        </div>
      </div>
      <CartModal />
    </Layout>
  );
};

export default Cart;
