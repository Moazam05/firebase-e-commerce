// React Imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Custom Imports
import Layout from '../../../components/Layout';
// Icons Imports
import { BsArrowLeft } from 'react-icons/bs';
// Firebase Imports
import { collection, getDocs } from 'firebase/firestore';
import firebaseDB from '../../../firebaseConfig';
import OrdersAccordion from './Components/OrdersAccordion';
import Loader from '../../../shared/Loader';

const Orders = () => {
  // States
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   Get Email From Local Storage
  const userName = JSON.parse(localStorage.getItem('user'));

  // Getting Orders Data From Firebase
  const getOrders = async () => {
    try {
      setLoading(true);
      const result = await getDocs(collection(firebaseDB, 'orders'));
      const ordersArray = [];
      result.forEach((allOrders) => {
        ordersArray.push(allOrders.data());
      });
      setLoading(false);

      setOrders(ordersArray?.filter((x) => x?.email === userName?.user?.email));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
  const totalBill = tempTotal?.reduce((n, { total }) => n + total, 0);
  // For Total Placed Order Quantity
  const totalItems = tempTotal?.reduce((n, { quantity }) => n + quantity, 0);

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <div
              className={`card ${loading ? 'loader-height' : 'normal-height'}`}
            >
              <div className='left-wrap'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h5 className='mb-0' style={{ textDecoration: 'underline' }}>
                    <Link to='/' className='text-body continue'>
                      <BsArrowLeft className='me-2' />
                      Continue shopping
                    </Link>
                  </h5>
                  <div className='order-total'>
                    Total Amount: ${totalBill.toFixed(2)}
                  </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between align-items-center mb-2'>
                  <div>
                    {orders?.length > 0 && (
                      <p className='mb-2'>
                        You have {totalItems} items on your Orders List
                      </p>
                    )}
                    <div>
                      {!loading && orders?.length < 0 && (
                        <Link to='/' className='btn btn-primary btn-sm mt-4'>
                          You are not placing any orders yet!
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {loading ? (
                  <Loader />
                ) : (
                  <div className='mt-4'>
                    <OrdersAccordion orders={orders} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
