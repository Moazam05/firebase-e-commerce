// React Imports
import React, { useEffect, useState } from 'react';
// Icons Imports
import { BsTrash } from 'react-icons/bs';
import { BiEdit, BiAddToQueue } from 'react-icons/bi';
// Custom Imports
import Layout from '../../../components/Layout';
import Loader from '../../../shared/Loader';
import EditProductModal from './Components/EditProductModal';
import AddProductModal from './Components/AddProductModal';
import DeleteProductModal from './Components/DeleteProductModal';
// Firebase Imports
import { collection, getDocs } from 'firebase/firestore';
import firebaseDB from '../../../firebaseConfig';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from './Components/TabSelector';
import './Components/Tabs.css';

const Admin = () => {
  // States
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [deleteProduct, setDeleteProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useTabs(['products', 'orders']);
  const [orders, setOrders] = useState([]);

  // Calculating Total Quantity and Total Price
  const tempTotal = orders?.map((order) =>
    order?.cartItems.reduce(
      (cartTotal, item) => {
        const { price, cartQuantity } = item;

        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;

        return cartTotal;
      },
      { total: 0, quantity: 0 }
    )
  );
  // For Total Business ($ Amount)
  const TotalBusiness = tempTotal?.reduce((n, { total }) => n + total, 0);
  // For Total Placed Order Quantity
  const TotalQuantity = tempTotal?.reduce((n, { quantity }) => n + quantity, 0);

  useEffect(() => {
    getData();
    getOrders();
  }, []);

  // Getting Products Data From Firebase
  const getData = async () => {
    try {
      setLoading(true);
      const users = await getDocs(collection(firebaseDB, 'products'));
      const productsArray = [];
      users.forEach((singleData) => {
        const obj = {
          id: singleData.id,
          ...singleData.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // For Getting Orders
  const getOrders = async () => {
    try {
      setLoading(true);
      const result = await getDocs(collection(firebaseDB, 'orders'));
      const ordersArray = [];
      result.forEach((allOrders) => {
        ordersArray.push(allOrders.data());
        setLoading(false);
      });

      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <div
              className={`card ${loading ? 'loader-height' : 'normal-height'}`}
            >
              <nav className='tabs-wrapper'>
                <TabSelector
                  isActive={selectedTab === 'products'}
                  onClick={() => setSelectedTab('products')}
                >
                  Products
                </TabSelector>
                <TabSelector
                  isActive={selectedTab === 'orders'}
                  onClick={() => setSelectedTab('orders')}
                >
                  Orders
                </TabSelector>
              </nav>
              <div style={{ padding: '24px 0' }}>
                <TabPanel hidden={selectedTab !== 'products'}>
                  <div className='left-wrap'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                      <h5 className=''>Product Lists</h5>
                      <button
                        type='button'
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#addProductModal'
                      >
                        <BiAddToQueue /> Add Product
                      </button>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                      <p className='mb-0 card-text'>
                        Total{' '}
                        <span className='fw-bold'> {products?.length} </span>{' '}
                        Products on your Store
                      </p>
                    </div>

                    {loading ? (
                      <Loader />
                    ) : (
                      <div>
                        {products?.map((item, index) => {
                          return (
                            <div
                              className='card mb-3 left-card-side'
                              style={{ width: '100%' }}
                              key={index}
                            >
                              <div
                                className='card-body'
                                style={{ width: 'unset' }}
                              >
                                <div className='d-flex justify-content-between left-side'>
                                  <div className='d-flex flex-row align-items-center'>
                                    <div className='admin-image-wrap'>
                                      <img
                                        src={item?.image}
                                        className='img-fluid rounded-3'
                                        alt='Shopping item'
                                      />
                                    </div>
                                    <div className='ms-3'>
                                      <h5>{item?.title.substring(0, 21)}</h5>
                                      <p className='mb-0 mt-2 card-text'>
                                        {item?.category}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='d-flex flex-row align-items-center icon gap-3'>
                                    <button
                                      type='button'
                                      data-bs-toggle='modal'
                                      data-bs-target='#editProductModal'
                                      className='fw-bold border-0'
                                      style={{
                                        color: '#78C2AD',
                                        background: 'transparent',
                                        fontSize: '22px',
                                      }}
                                      onClick={() => setSelectedProduct(item)}
                                    >
                                      <BiEdit />
                                    </button>
                                    <div>
                                      <h5 className='mb-0'>${item?.price}</h5>
                                    </div>
                                    <button
                                      type='button'
                                      data-bs-toggle='modal'
                                      data-bs-target='#deleteProductModal'
                                      className='fw-bold border-0'
                                      style={{
                                        color: '#F3969A',
                                        background: 'transparent',
                                        fontSize: '21px',
                                      }}
                                      onClick={() => setDeleteProduct(item)}
                                    >
                                      <BsTrash />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <EditProductModal
                                isEditProduct={true}
                                productData={selectedProduct}
                              />
                              <DeleteProductModal delProduct={deleteProduct} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel hidden={selectedTab !== 'orders'}>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h5 className=''>Orders Placed</h5>
                  </div>
                  <hr />
                  <div className='d-flex justify-content-between align-items-center mb-2'>
                    <p className='mb-0 card-text'>
                      Total <span className='fw-bold'> {TotalQuantity} </span>{' '}
                      Orders are placed
                    </p>
                  </div>
                  <div className='container padding-bottom-3x mb-1'>
                    <div className='table-responsive shopping-cart'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Quantity</th>
                            <th className='text-center'>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders?.map((order) => {
                            return order?.cartItems.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {/* {orders?.map((item, index) => (
                                    <div
                                      className='d-flex gap-3 mt-2 mb-3'
                                      key={index}
                                    >
                                      <div className='text-center fw-bold'>
                                        Client Name:{' '}
                                        <span className='fw-normal'>
                                          {item?.addressInfo?.name}
                                        </span>
                                      </div>
                                      <div className='text-center fw-bold'>
                                        Client Email:{' '}
                                        <span className='fw-normal'>
                                          {item?.email}
                                        </span>
                                      </div>
                                    </div>
                                  ))} */}
                                  <div className='product-item'>
                                    <div className='product-thumb'>
                                      <img src={item?.image} alt='Product' />
                                    </div>
                                    <div className='product-info'>
                                      <h4 className='product-title mt-3'>
                                        <div>
                                          {item?.title.substring(0, 19)}
                                        </div>
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
                                      <div>
                                        <div className='text-center text-lg text-medium'>
                                          {item?.cartQuantity}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className='text-center text-lg text-medium'>
                                  ${item?.price * item?.cartQuantity}
                                </td>
                              </tr>
                            ));
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className='shopping-cart-footer'>
                      <div className='column text-lg'>
                        Total Business:{' '}
                        <span className='fw-bold'>
                          ${TotalBusiness.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
      <AddProductModal />
    </Layout>
  );
};

export default Admin;
