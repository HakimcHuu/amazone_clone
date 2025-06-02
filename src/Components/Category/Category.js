import React from 'react';
import { CategoryInfo } from './CategoryFullInfo';
import CategoryCard from './CategoryCard';
import classes from './CategoryCard.module.css';

function Category() {
  return (
    <div className={classes.Category_container}>
      {CategoryInfo.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </div>
  );
}

export default Category;

