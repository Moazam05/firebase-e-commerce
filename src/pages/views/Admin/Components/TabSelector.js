import React from 'react';
import './Tabs.css';

export const TabSelector = ({ isActive, children, onClick }) => (
  <button
    className={`basic-button ${isActive ? 'isActive' : 'noActive'}`}
    onClick={onClick}
  >
    {children}
  </button>
);
