import React from 'react';

const Loader = () => {
  const loaderStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%',
    color: '#78C2AD',
  };

  const spinnerSize = {
    width: '45px',
    height: '45px',
  };

  return (
    <div>
      <div className='d-flex justify-content-center' style={loaderStyle}>
        <div className='spinner-border' role='status' style={spinnerSize}></div>
      </div>
    </div>
  );
};

export default Loader;
