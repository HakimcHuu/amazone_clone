import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css'
import {Link} from 'react-router-dom'
import { Type } from '../../Utility/action.type';
import { DataContext } from '../DataProvider/DataProvider';

function ProductCard({ Product={},flex,renderDesc,renderAdd}) {
    // function ProductCard({ Product,flex,renderDesc,renderAdd}) {

    // Destructure product properties
    const { title, id ,price, image, rating={},description } = Product;
    const { rate = 0, count = 0 } = rating;
    // const { title, id ,price, image, rating,description } = Product;
    // console.log(Product);
    
    const [state,dispatch] = useContext(DataContext)
    // console.log(state);

    const addToCart=()=>{
        dispatch({type:Type.ADD_TO_BASKET,
            item:{
                id,
                title,
                price,
                image,
                rating,
                description
            }
        })
    }
    



    return (
        <div className={`${ classes.card_container} ${flex?classes.Product_flexed:''}`}>
            <Link to={`/products/${id}`}>
                <img src={image} alt=" " className={classes.img_container} />
            </Link>

            <div>
                <h3>{title}</h3>
                {/* {renderDesc && <div style={{maxwidth:"200px"}}>{description}</div>} */}
                {renderDesc && <div className={classes.img}>{description}</div>}

                <div className={classes.rating}>
                    {/* Rating */}
                    <Rating value={rating.rate} precision={0.1} />
                    {/* Rating count */}
                    <small>{rating.count}</small>
                </div>

                <div>
                    {/* Price */}
                    <CurrencyFormat amount={price} />
                </div>
                {
                    renderAdd && <button className={classes.button} onClick={addToCart}>
                    Add to cart
                </button>
                }
                
            </div>
        </div>
    );
}

export default ProductCard;










