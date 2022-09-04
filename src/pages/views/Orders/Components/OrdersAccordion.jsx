import React from 'react';
import './Orders.css';

const OrdersAccordion = ({ orders }) => {
  const textColor = {
    color: '#5a5a5a',
  };

  return (
    <div>
      {orders?.map((order) => {
        return order?.cartItems.map((item, index) => (
          <div className='accordion' id='accordionExample' key={index}>
            <div className='accordion-item'>
              <h2 className='accordion-header' id='headingOne'>
                <button
                  className='accordion-button'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={`#${item?.id}`}
                  aria-expanded='true'
                  aria-controls={item?.id}
                >
                  {item?.title}{' '}
                  <span className='ms-3'>Quantity : {item?.cartQuantity}</span>
                  <span className='ms-3'>Email : {order?.email}</span>
                </button>
              </h2>
              <div
                id={item?.id}
                className='accordion-collapse collapse show'
                aria-labelledby='headingOne'
                data-bs-parent='#accordionExample'
              >
                <div
                  className='accordion-body'
                  style={{ padding: '1rem 2rem 1rem 1rem' }}
                >
                  <div className='d-flex justify-content-between left-side'>
                    <div className='d-flex flex-row align-items-center'>
                      <div>
                        <img
                          src={item?.image}
                          className='img-fluid rounded-3'
                          alt='Shopping item'
                          style={{ width: 65 }}
                        />
                      </div>
                      <div className='ms-3'>
                        <h5 style={textColor}>
                          {item?.title.substring(0, 21)}
                        </h5>
                        <p className='small mb-0' style={textColor}>
                          {item?.category}
                        </p>
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center icon gap-5'>
                      <div>
                        <span style={textColor}>Price:</span>
                        <h5 className='mb-0' style={textColor}>
                          ${item?.price}
                        </h5>
                      </div>
                      <div>
                        <span style={textColor}>SubTotal:</span>
                        <h5 className='mb-0' style={textColor}>
                          ${item?.price * item?.cartQuantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
      })}
    </div>
  );
};

export default OrdersAccordion;
