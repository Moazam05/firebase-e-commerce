// React Imports
import React from 'react';
import { Link } from 'react-router-dom';
// CSS Imports
import './Cards.css';
// Redux Imports
import { useDispatch } from 'react-redux';
// Store Imports
import { addToCart } from '../../Cart/Store';

const Cards = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div
      className='card mx-2'
      style={{ width: 'unset', padding: '2rem', minHeight: '485px' }}
    >
      <div className='d-flex flex-column align-items-center px-5 remove-px'>
        <div className='card-image-wrapper'>
          <img
            className='mx-auto img-thumbnail mt-3'
            src={product?.image}
            alt='logo'
          />
        </div>
      </div>
      <div className='card-body text-center mx-auto d-flex flex-column justify-content-center'>
        <h5
          className='card-title font-weight-bold'
          style={{ minHeight: '50px' }}
        >
          {product?.title}
        </h5>
        <p className='card-text'>${product?.price}</p>
        <div className='button-fixed'>
          <Link
            to={`/productinfo/${product?.id}`}
            className='btn details btn-sm'
          >
            view details
          </Link>
          <br />
          <button
            type='button'
            className='btn cart btn-sm'
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
