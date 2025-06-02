// import React, { useContext } from 'react';
// import classes from './Cart.module.css';
// import LayOut from '../../Components/LayOut/LayOut';
// import { DataContext } from '../../Components/DataProvider/DataProvider';
// import ProductCard from '../../Components/Product/ProductCard';
// import { Link } from 'react-router-dom';
// import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
// import { Type } from '../../Utility/action.type';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

// function Cart() {
//   const [{basket,user},dispatch] = useContext(DataContext);

//   const total = basket.reduce((amount,item)=>{
//     return item.price*item.amount+amount
//   }, 0)
//   // console.log(basket);
//   const increment = (item) => {
//     dispatch({type:Type.ADD_TO_BASKET,item})
//   }
//   const decrement = (id) => {
//     dispatch({type:Type.REMOVE_FROM_BASKET,id})
//   }

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.Cart_container}>
//           <h2>Hello</h2>
//           <h3>your shopping basket</h3>
//           <hr />
//           {
//             basket?.length===0?(<p>Oops ! No items in your cart</p>):(
//               basket?.map((item,i)=>{
//                 return
//                 <section className={classes.cart_product} key={i}>
//                 <ProductCard
//                   // key={i}
//                   product={item}
//                   renderDesc={true}
//                   renderAdd={false}
//                   flex={true}
//                 />
//                 <div className={classes.btn_container}>
//                   <button className={classes.btn} onClick={()=>increment(item)}>
//                     <IoIosArrowUp size={20}/>
//                   </button>
//                   <span>{item.amount}</span>  {/* quantity */}
//                   <button className={classes.btn} onClick={()=>decodeURIComponent(item.id)}>
//                     <IoIosArrowDown size={20}/>
//                   </button>
//                 </div>
//                 </section>

//               })
//             )
//           }
//         </div>
//         {
//           basket?.length!==0 && (
//             <div className={classes.subtotal}>
//               <div>
//                 <p>Subtotal ({basket?.length}items)</p>
//                 <CurrencyFormat amount={total}/>
//               </div>
//               <span>
//                 <input type="checkbox" />
//                 <small>This order contains a gift</small>
//               </span>
//               <Link to="/payments">Continue to checkout</Link>
//             </div>

//           )
//         }
//     </section>
//     </LayOut>

//   )
// }

// export default Cart

// import React, { useContext } from "react";
// import classes from "./Cart.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import { Link } from "react-router-dom";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import { Type } from "../../Utility/action.type";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// function Cart() {
//   const [{ basket, user }, dispatch] = useContext(DataContext);

//   const total = basket.reduce(
//     (amount, item) => item.price * item.amount + amount,
//     0
//   );

//   const increment = (item) => {
//     dispatch({ type: Type.ADD_TO_BASKET, item });
//   };

//   const decrement = (id) => {
//     dispatch({ type: Type.REMOVE_FROM_BASKET, id });
//   };

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.Cart_container}>
//           <h2>Hello</h2>
//           <h3>Your Shopping Basket</h3>
//           <hr />
//           {basket?.length === 0 ? (
//             <p>
//               Oops! No items in your cart. <Link to="/">Go shopping now!</Link>
//             </p>
//           ) : (
//             basket.map((item, i) => (
//               <section className={classes.cart_product} key={i}>
//                 <ProductCard
//                   Product={item}
//                   renderDesc={true}
//                   renderAdd={false}
//                   flex={true}
//                 />
//                 <div className={classes.btn_container}>
//                   <button
//                     className={classes.btn}
//                     onClick={() => increment(item)}
//                   >
//                     <IoIosArrowUp size={20} />
//                   </button>
//                   <span>{item.amount}</span>
//                   <button
//                     className={classes.btn}
//                     onClick={() => decrement(item.id)}
//                   >
//                     <IoIosArrowDown size={20} />
//                   </button>
//                 </div>
//               </section>
//             ))
//           )}
//         </div>
//         {basket?.length !== 0 && (
//           <div className={classes.subtotal}>
//             <div>
//               <p>Subtotal ({basket?.length} items)</p>
//               <CurrencyFormat amount={total} />
//             </div>
//             <span>
//               <input type="checkbox" />
//               <small>This order contains a gift</small>
//             </span>
//             <Link to="/payment">Continue to checkout</Link>
//           </div>
//         )}
//       </section>
//     </LayOut>
//   );
// }

// export default Cart;


import React, { useContext, useState, useEffect } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { Link } from "react-router-dom";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const [hideSubtotal, setHideSubtotal] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };

  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };

  // Scroll listener to toggle hideSubtotal state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px -> hide
        setHideSubtotal(true);
      } else {
        // Scrolling up -> show
        setHideSubtotal(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>
              Oops! No items in your cart. <Link to="/">Go shopping now!</Link>
            </p>
          ) : (
            basket.map((item, i) => (
              <section className={classes.cart_product} key={i}>
                <ProductCard
                  Product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div
            className={`${classes.subtotal} ${
              hideSubtotal ? classes.hidden : ""
            }`}
          >
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
