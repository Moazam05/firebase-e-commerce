// React Imports
import React, { useState } from 'react';
// React Toastify
import { toast } from 'react-toastify';
// Context Provider
import { useAuth } from '../../../../context/useAuth';
// Firebase Imports
import { deleteDoc, doc } from 'firebase/firestore';
// Firebase DB
import firebaseDB from '../../../../firebaseConfig';

const DeleteProductModal = ({ delProduct }) => {
  // States
  const [loading, setLoading] = useState(false);

  // Context
  const { deleteProduct } = useAuth();

  // Add Product
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await deleteDoc(doc(firebaseDB, 'products', delProduct?.id));
      setLoading(false);
      deleteProduct();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Something Went Wrong');
    }
  };

  return (
    <div>
      <div
        className='modal fade'
        id='deleteProductModal'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Delete Product
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>
              <form className='mx-1 mx-md-4' onSubmit={onSubmit}>
                <div className='d-flex flex-row align-items-center mb-3'>
                  <h6>Are you sure you want to delete</h6>
                </div>

                <div className='modal-footer d-flex justify-content-between'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    {loading && (
                      <span className='spinner-border spinner-border-sm mr-1'></span>
                    )}{' '}
                    Delete
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

export default DeleteProductModal;
