// React Imports
import React from 'react';
// Icons Imports
import { AiFillHeart } from 'react-icons/ai';

const Footer = () => {
  return (
    // position-fixed
    <footer className='page-footer font-small  bottom-0 start-0 end-0 mt-4'>
      <div className='footer-copyright text-center py-3'>
        © 2022 Firebase E-Commerce Made with{' '}
        <span style={{ color: '#172B4D' }}>
          <AiFillHeart />
        </span>{' '}
        <a href='https://www.linkedin.com/in/moazam05/'>Moazam</a>
      </div>
    </footer>
  );
};

export default Footer;
