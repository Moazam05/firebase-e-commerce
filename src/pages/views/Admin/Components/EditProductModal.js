// React Imports
import React, { useEffect } from 'react';
// React Hook Form
import { useForm } from 'react-hook-form';
// React Toastify
import { toast } from 'react-toastify';
// Firebase Imports
import { setDoc, doc } from 'firebase/firestore';
import firebaseDB from '../../../../firebaseConfig';
// Context Provider
import { useAuth } from '../../../../context/useAuth';

const EditProductModal = ({ isEditProduct, productData }) => {
  // Context
  const { editOrder } = useAuth();

  // React Hook Form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      productName: '',
      price: '',
      imageURL: '',
      category: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isEditProduct) {
      reset({
        productName: productData?.title,
        price: productData?.price,
        imageURL: productData?.image,
        category: productData?.category,
        description: productData?.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  // Update Product
  const onSubmit = async (data) => {
    const updateInfo = {
      title: data?.productName,
      price: Number(data?.price),
      image: data?.imageURL,
      category: data?.category,
      description: data?.description,
      rating: productData?.rating ? productData?.rating : 4,
    };

    try {
      // For Updating Orders
      await setDoc(doc(firebaseDB, 'products', productData?.id), updateInfo);
      editOrder();
    } catch (error) {
      toast.error('Update Failed');
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className='modal fade'
        id='editProductModal'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Update Product
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>
              <form className='mx-1 mx-md-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='product-name'>
                      Product Name
                    </label>

                    <input
                      {...register('productName', {
                        required: true,
                        maxLength: 50,
                      })}
                      type='text'
                      id='product-name'
                      className='form-control'
                      placeholder='Smart Watch'
                    />
                    {errors?.productName?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Product Name is required
                      </div>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='price'>
                      Price
                    </label>

                    <input
                      {...register('price', {
                        required: true,
                        maxLength: 6,
                      })}
                      type='number'
                      id='price'
                      className='form-control'
                      placeholder='$ 355.00'
                    />
                    {errors?.price?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Price is required
                      </div>
                    )}
                    {errors?.price?.type === 'maxLength' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Price cannot greater than $999.00
                      </div>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='image-url'>
                      Image URL
                    </label>

                    <input
                      {...register('imageURL', {
                        required: true,
                      })}
                      className='form-control'
                      id='image-url'
                      rows={3}
                      placeholder='https://'
                    />

                    {errors?.imageURL?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Image URL is required
                      </div>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='category'>
                      Category
                    </label>
                    <select
                      {...register('category', {
                        required: true,
                      })}
                      id='category'
                      className='form-control'
                    >
                      <option value='headphones'>Headphones</option>
                      <option value='electronics'>Electronics</option>
                      <option value='airbeds'>Airbeds</option>
                      <option value='speakers'>Speakers</option>
                      <option value='watches'>Watches</option>
                      <option value='jewelry'>Jewelry</option>
                      <option value='bags'>Bags</option>
                      <option value='jacket'>Jacket</option>
                    </select>
                    {errors?.category?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Category is required
                      </div>
                    )}
                  </div>
                </div>

                <div className='d-flex flex-row align-items-center mb-3'>
                  <div className='form-outline flex-fill mb-0'>
                    <label className='form-label' htmlFor='description'>
                      Description
                    </label>

                    <textarea
                      {...register('description', {
                        required: true,
                      })}
                      className='form-control'
                      id='description'
                      rows={3}
                      placeholder='Something'
                    />

                    {errors?.description?.type === 'required' && (
                      <div className='text-danger font-small-2 mt-25'>
                        Description is required
                      </div>
                    )}
                  </div>
                </div>
                <div className='modal-footer d-flex justify-content-between'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
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
                    Update
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

export default EditProductModal;
