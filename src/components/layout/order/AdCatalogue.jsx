import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const AdCatalogue = () => {
  return (
    <div>
      <Navbar />

      <div className='dcontainer'>
        <div className='left-side'>
          <Sidebar />
        </div>
        <div className='main-content'>
          <h1>Catalogue</h1>
        </div>
      </div>
    </div>
  );
};

export default AdCatalogue;
