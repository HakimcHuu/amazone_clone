import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user)
  const totalItems = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setcardError] = useState(null);

  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setcardError(e?.error?.message) : setcardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      setcardError("Please sign in to complete your purchase");
      return;
    }

    try { 
      setProcessing(true);
      //step 1
      //backend || function--->contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);

      if (!response.data?.clientSecret) {
        throw new Error("No client secret received from server");
      }

      const clientSecret = response.data?.clientSecret;

      //step 2
      //client side (react side confirmation)
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (!paymentIntent) {
        throw new Error("No payment intent received");
      }

      //step 3
      //after the confirmation order firestore database save, clear the confirmation order
      try {
        await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
      } catch (firebaseError) {
        console.error("Firebase error:", firebaseError);
        throw new Error("Failed to save order. Please try again.");
      }

      //empty the basket
      dispatch({ type: "EMPTY_BASKET" });
      setProcessing(false);

      // Navigate to orders page with correct path
      navigate("/Orders", {
        state: {
          msg: "Your order has been placed successfully!",
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      setProcessing(false);
      setcardError(
        error.message || "An error occurred during payment. Please try again."
      );
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.Payment_header}>
        Checkout ({totalItems}) items
      </div>

      {/* payment section */}
      <section className={classes.Payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>chicago,1l</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard Product={item} flex={true} key={item.id} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}

                {cardError && (
                  <small style={{ color: "red" }}> {cardError} </small>
                )}
                {/* card element*/}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.Payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
