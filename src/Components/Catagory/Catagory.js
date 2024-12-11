import React from 'react';
import { CatagoryInfo } from './CatagoryFullInfo';
import CatagoryCard from './CatagoryCard';
import classes from './CatagoryCard.module.css';

function Catagory() {
  return (
    <div className={classes.Catagory_container}>
      {CatagoryInfo.map((infos, index) => (
        <CatagoryCard key={index} data={infos} />
      ))}
    </div>
  );
}

export default Catagory;

