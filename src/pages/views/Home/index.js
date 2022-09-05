// React Imports
import React, { useEffect, useState } from 'react';
// Custom Imports
import Layout from '../../../components/Layout';
import Cards from './Components/Cards';
// React Icons
import { AiOutlineShoppingCart } from 'react-icons/ai';
// Firebase Imports
import { collection, getDocs } from 'firebase/firestore';
import firebaseDB from '../../../firebaseConfig';
// CSS Imports
import './Components/Cards';

const Home = () => {
  // States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // For Filters
  const [searchKey, setSearchKey] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    getData();
  }, []);

  // Getting Products Data From Firebase
  const getData = async () => {
    try {
      setLoading(true);
      const users = await getDocs(collection(firebaseDB, 'products'));
      const productsArray = [];
      users.forEach((singleData) => {
        const obj = {
          id: singleData.id,
          ...singleData.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <div className='container'>
        <div
          className='mt-5 d-flex gap-3 filter-wap'
          style={{ paddingLeft: '11px' }}
        >
          <input
            type='text'
            className='form-control filter-width'
            placeholder='Search Items'
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <select
            className='form-control filter-width'
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value=''>All</option>
            <option value='headphones'>Headphones</option>
            <option value='airbeds'>Airbeds</option>
            <option value='speakers'>Speakers</option>
            <option value='watches'>Watches</option>
            <option value='jacket'>Jacket</option>
          </select>
        </div>
        <div className='row'>
          {products
            .filter((obj) => obj.title.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product, index) => (
              <div className='col-md-6 col-lg-4' key={index}>
                <Cards product={product} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
