import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams(); // Get productId from the URL
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    setIsLoading(true);
    setError(null); // Reset error state on new request

    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load product details. Please try again later.');
        setIsLoading(false);
      });
  }, [productId]); // Include productId in the dependency array

  return (
    <LayOut> 
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={classes.error}>{error}</div> // Display error if fetching fails
      ) : (
        <ProductCard 
          Product={product} 
          flex={true} 
          renderDesc={true} 
          renderAdd={true} 
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
