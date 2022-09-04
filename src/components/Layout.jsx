// React Imports
import React from 'react';
// Custom Imports
import Header from './Header';
import Footer from './Footer';
import Loader from '../shared/Loader';

const Layout = (props) => {
  return (
    <div>
      {props.loading && <Loader />}
      <Header />
      <div className='content'>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
