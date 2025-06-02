import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { DataContext } from "../DataProvider/DataProvider";

function ProductCard({ Product, flex, renderDesc, renderAdd }) {
  const [state, dispatch] = useContext(DataContext);

  if (!Product) {
    return null; // Return null if Product is undefined
  }

  // Destructure product properties with default values
  const {
    title = "",
    id = "",
    price = 0,
    image = "",
    rating = { rate: 0, count: 0 },
    description = "",
  } = Product;

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        price,
        image,
        rating,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.Product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>

      <div>
        <h3>{title}</h3>
        {/* {renderDesc && <div style={{maxwidth:"200px"}}>{description}</div>} */}
        {renderDesc && <div className={classes.img}>{description}</div>}

        <div className={classes.rating}>
          {/* Rating */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          {/* <Rating value={rating.rate} precision={0.1}/> */}
          {/* Rating count */}
          <small>{rating?.count || 0}</small>
        </div>

        <div>
          {/* Price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
