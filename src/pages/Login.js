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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// Context Provider
import { useAuth } from '../context/useAuth';

// Check Email Validation
const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const Login = () => {
  // Context
  const { login } = useAuth();

  // States
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Login Handler
  const onSubmit = async (data) => {
    // Auth From Firebase Built in
    const auth = getAuth();

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );

      login(result);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Wrong Password');
      } else {
        toast.error('Login Failed');
      }
    }
  };

  return (
    <div className='login-wrapper'>
      <section className='section'>
        <div className='outer-login'>
          <div className='container'>
            {loading && <Loader />}
            <div className='row d-flex justify-content-center align-items-center h-100'>
              <div className='col-lg-12 col-xl-11'>
                <div className='card text-black' style={{ borderRadius: 25 }}>
                  <div className='card-body p-md-5'>
                    <div className='row justify-content-center'>
                      <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                        <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                          Login
                        </p>
                        <form
                          className='mx-1 mx-md-4'
                          onSubmit={handleSubmit(onSubmit)}
                        >
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
                                placeholder='login@gmail.com'
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
                            </div>
                          </div>

                          <div className='d-flex justify-content-center mt-4 mb-3 mb-lg-4'>
                            <button
                              type='submit'
                              className='btn btn-primary btn-lg mt-3 text-white'
                              disabled={isSubmitting}
                            >
                              {isSubmitting && (
                                <span className='spinner-border spinner-border-sm mr-1'></span>
                              )}{' '}
                              Login
                            </button>
                          </div>
                          <p className='text-center text-muted mt-5 mb-0'>
                            Click Here To Register!{' '}
                            <Link to='/register' className='fw-bold text-body'>
                              <u>Register here</u>
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

export default Login;
