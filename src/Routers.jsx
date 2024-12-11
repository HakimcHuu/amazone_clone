import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
const stripePromise = loadStripe(
  "pk_test_51QPmhsP6R5yf02q7HWxHse1ynv8gwH6knRNYxRsHMKPjx8l0ihLguK8wWnG6ZlfQALV1yaPNiEY6mrc1EIkNqA9Q00M6b21Snk"
);
function Routing() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/Payment"
          element={
            <ProtectedRoute msg={"you must log in to pay"} redirect={"/Payment"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/Orders" element={
          <ProtectedRoute
          msg={"you must log in to view your orders"} 
          redirect={"/Orders"}
          >
            <Orders />
          </ProtectedRoute>
        } />
        
        <Route path="/category/:CatagoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;