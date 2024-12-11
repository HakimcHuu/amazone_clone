import React, { useEffect, useState } from 'react';
import classes from './Results.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Handle API errors
  const { CatagoryName } = useParams(); // Correct spelling for consistency

  useEffect(() => {
    setIsLoading(true); // Start loader
    setError(null); // Reset error state

    axios
      .get(`${productUrl}/products/category/${CatagoryName}`)
      .then((res) => {
        setResults(Array.isArray(res.data) ? res.data : []); // Ensure results is always an array
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch products. Please try again later.');
        setIsLoading(false);
      });
  }, [CatagoryName]); // Add CategoryName as a dependency

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category / {CatagoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className={classes.error}>{error}</div> // Display error message
        ) : results.length > 0 ? (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                Product={product} // Capital "P" for ProductCard prop
                renderAdd={true}
                renderDesc={true}
              />
            ))}
          </div>
        ) : (
          <p style={{ padding: '30px' }}>No products found for this category.</p>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
