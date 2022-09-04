// React Imports
import React from 'react';
// React Redux
import { useDispatch } from 'react-redux';
// React Hook Form
import { useForm } from 'react-hook-form';
// React Toastify
import { toast } from 'react-toastify';
// Firebase Imports
import { addDoc, collection } from 'firebase/firestore';
// Firebase DB
import firebaseDB from '../../../../firebaseConfig';
// Context Provider
import { useAuth } from '../../../../context/useAuth';
// Store Imports
import { clearCart } from '../Store/index';

const CartModal = () => {
  const dispatch = useDispatch();
  // Context
  const { orders } = useAuth();

  // React Hook Form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      address: '',
      pinCode: '',
      phoneNumber: '',
    },
  });

  // Reset States
  const handleReset = () => {
    reset({
      name: '',
      address: '',
      pinCode: '',
      phoneNumber: '',
    });
  };

  // Local Storage
  const user = JSON.parse(localStorage.getItem('user'));
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const { email, uid } = user?.user;

  // Form Submit
  const onSubmit = async (data) => {
    const addressInfo = {
      name: data?.name,
      address: data?.address,
      pinCode: data?.pinCode,
      phoneNumber: data?.phoneNumber,
    };

    const ordersInfo = {
      addressInfo,
      cartItems,
      email: email,
      userId: uid,
    };

    try {
      // For Placing Orders
      const result = await addDoc(collection(firebaseDB, 'orders'), ordersInfo);

      if (result) {
        handleReset();
      }
      orders();
      dispatch(clearCart());
    } catch (error) {
      toast.error('Order Failed');
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className='modal fade'
        id='cartModal'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add Your Address
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={handleReset}
              />
            </div>
            <div className='modal-body'>
              <form className='mx-1 mx-md-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='user-name'>
                      Your Name
                    </label>

                    <input
                      {...register('name', {
                        required: true,
                        maxLength: 20,
                      })}
                      type='text'
                      id='user-name'
                      className='form-control'
                      placeholder='john doe'
                    />
                    {errors?.name?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Name is required
                      </div>
                    )}
                    {errors?.name?.type === 'maxLength' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Name cannot greater than 20 characters
                      </div>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='user-address'>
                      Your Address
                    </label>

                    <textarea
                      {...register('address', {
                        required: true,
                      })}
                      className='form-control'
                      id='user-address'
                      rows={3}
                      placeholder='DHA Y Block'
                    />

                    {errors?.address?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Address is required
                      </div>
                    )}
                  </div>
                </div>
                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='pic-code'>
                      Pin Code
                    </label>

                    <input
                      {...register('pinCode', {
                        required: true,
                        minLength: 5,
                      })}
                      type='number'
                      id='pic-code'
                      className='form-control'
                      placeholder='********'
                    />
                    {errors?.pinCode?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Pin Code is required
                      </div>
                    )}
                    {errors?.pinCode?.type === 'minLength' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Pin Code cannot less than 5 characters
                      </div>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='phoneNumber'>
                      Phone Number
                    </label>

                    <input
                      {...register('phoneNumber', {
                        required: true,
                        minLength: 11,
                      })}
                      type='number'
                      id='phoneNumber'
                      className='form-control'
                      placeholder='090078601'
                    />
                    {errors?.phoneNumber?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Phone Number is required
                      </div>
                    )}
                    {errors?.phoneNumber?.type === 'minLength' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Pin Code cannot less than 11 characters
                      </div>
                    )}
                  </div>
                </div>

                <div className='modal-footer d-flex justify-content-between'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                    onClick={handleReset}
                  >
                    Close
                  </button>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='btn btn-primary'
                  >
                    {isSubmitting && (
                      <span className='spinner-border spinner-border-sm mr-1'></span>
                    )}{' '}
                    Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
