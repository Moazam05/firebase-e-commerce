// React Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// React Hook Form
import { useForm } from 'react-hook-form';
// Custom Imports
import Loader from '../shared/Loader';
// Styles Imports
import '../assets/styles/Register.css';
// React Toastify
import { toast } from 'react-toastify';
// Firebase Imports
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
// Firebase DB
import firebaseDB from '../firebaseConfig';
// Context Provider
import { useAuth } from '../context/useAuth';

// Check Email Validation
const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const Register = () => {
  // Context
  const { registerUser } = useAuth();

  // States
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Reset States
  const handleReset = () => {
    reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  // Form Submit
  const onSubmit = async (data) => {
    const auth = getAuth();

    try {
      setLoading(true);
      // For Registration
      const result = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      // For Save Name and Email
      await addDoc(collection(firebaseDB, 'userName'), {
        name: data?.name,
        email: data?.email,
      });
      setLoading(false);
      if (result) {
        handleReset();
      }
      registerUser();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('The email address is already in us');
      } else {
        toast.error('Registration Failed');
      }
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='register-wrapper'>
      <section className='section'>
        <div className='outer-register'>
          <div className='container'>
            {loading && <Loader />}
            <div className='row d-flex justify-content-center align-items-center h-100'>
              <div className='col-lg-12 col-xl-11'>
                <div className='card text-black' style={{ borderRadius: 25 }}>
                  <div className='card-body p-md-5'>
                    <div className='row justify-content-center'>
                      <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                        <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                          Sign up
                        </p>
                        <form
                          className='mx-1 mx-md-4'
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className='d-flex flex-row align-items-center mb-3'>
                            <div className='form-outline flex-fill mb-0'>
                              <label
                                className='form-label'
                                htmlFor='employee-name'
                              >
                                Your Name
                              </label>

                              <input
                                {...register('name', {
                                  required: true,
                                  maxLength: 20,
                                })}
                                type='text'
                                id='employee-name'
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
                              <label
                                className='form-label'
                                htmlFor='employee-email'
                              >
                                Your Email
                              </label>

                              <input
                                {...register('email', {
                                  required: true,
                                  validate: isValidEmail,
                                })}
                                type='email'
                                id='employee-email'
                                className='form-control'
                                placeholder='register@gmail.com'
                              />
                              {errors?.email?.type === 'required' && (
                                <div className='text-danger font-small-2 mt-25'>
                                  Email is required
                                </div>
                              )}
                              {errors?.email?.type === 'validate' && (
                                <div className='text-danger font-small-2 mt-25'>
                                  Enter valid Email
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='d-flex flex-row align-items-center mb-3'>
                            <div className='form-outline flex-fill mb-0'>
                              <label
                                className='form-label'
                                htmlFor='employee-password'
                              >
                                Password
                              </label>

                              <input
                                {...register('password', {
                                  required: true,
                                  minLength: 6,
                                })}
                                type='password'
                                id='employee-password'
                                className='form-control'
                                placeholder='********'
                              />
                              {errors?.password?.type === 'required' && (
                                <div className='text-danger font-small-2 mt-25'>
                                  Password is required
                                </div>
                              )}
                              {errors?.password?.type === 'minLength' && (
                                <div className='text-danger font-small-2 mt-25'>
                                  password cannot less than 6 characters
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='d-flex flex-row align-items-center mb-3'>
                            <div className='form-outline flex-fill mb-0'>
                              <label
                                className='form-label'
                                htmlFor='employee-c-password'
                              >
                                Password is required
                              </label>
                              <input
                                {...register('confirmPassword', {
                                  required: true,
                                })}
                                type='password'
                                id='employee-c-password'
                                className='form-control'
                                placeholder='********'
                              />
                              {watch('confirmPassword') !== watch('password') &&
                              getValues('confirmPassword') ? (
                                <div className='text-danger font-small-2 mt-25'>
                                  Password do not match
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className='d-flex justify-content-center mt-4 mb-3 mb-lg-4'>
                            <button
                              type='submit'
                              className='btn btn-primary btn-lg mt-3 text-white'
                              disabled={isSubmitting}
                              style={{ width: '170px' }}
                            >
                              {isSubmitting && (
                                <span className='spinner-border spinner-border-sm mr-1'></span>
                              )}{' '}
                              Register
                            </button>
                          </div>
                          <p className='text-center text-muted mt-5 mb-0'>
                            Have already an account?{' '}
                            <Link to='/login' className='fw-bold text-body'>
                              <u>Login here</u>
                            </Link>
                          </p>
                        </form>
                      </div>
                      <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                        <img
                          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                          className='img-fluid'
                          alt='Sample'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
