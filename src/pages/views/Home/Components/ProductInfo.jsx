// React Imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Redux Imports
import { useDispatch } from 'react-redux';
// Firebase Imports
import { getDoc, doc } from 'firebase/firestore';
import firebaseDB from '../../../../firebaseConfig.js';
// Custom Imports
import Layout from '../../../../components/Layout';
import Rating from './Rating.jsx';
// Store Imports
import { addToCart } from '../../Cart/Store';
// Import CSS
import './ProductInfo.css';

const ProductInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // States
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const productTemp = await getDoc(doc(firebaseDB, 'products', params.id));
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, id: params.id }));
  };

  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='card' style={{ width: '100%' }}>
          <div className='row'>
            <div className='col-md-5'>
              <div>
                <div className='d-flex align-items-center'>
                  <div className='product-image-wrapper'>
                    <img src={product?.image} alt={product?.title} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-1'></div>
            <div className='col-md-6'>
              <div>
                <h3 className='product-title'>{product?.title}</h3>
                <div className='rating d-flex align-items-center'>
                  {
                    <Rating
                      rating={product?.rating?.rate ? product?.rating?.rate : 4}
                    />
                  }
                  <span className='review-no'>
                    {product?.rating?.count ? product?.rating?.count : 325}{' '}
                    reviews
                  </span>
                </div>
                <p className='product-description'>{product?.description}</p>
                <h6 className='price'>
                  current price: <span>$ {product?.price}</span>
                </h6>

                <div className='action'>
                  <button
                    className='add-to-cart btn btn-default btn-sm'
                    type='button'
                    onClick={() => handleAddToCart(product)}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
