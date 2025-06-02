import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: {
          msg: "You must be logged in to view your orders",
          redirect: "/Orders",
        },
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(
          (snapshot) => {
            // console.log(snapshot);
            const orders = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setOrders(orders);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching orders:", error);
            setError("Failed to load orders. Please try again later.");
            setLoading(false);
          }
        );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up orders listener:", error);
      setError("Failed to load orders. Please try again later.");
      setLoading(false);
    }
  }, [user, navigate]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders</h2>

          {/* Display success message if present */}
          {location.state?.msg && (
            <div className={classes.success_message}>{location.state.msg}</div>
          )}

          {/* Display loading state */}
          {loading && (
            <div className={classes.loading}>Loading your orders...</div>
          )}

          {/* Display error if any */}
          {error && <div className={classes.error_message}>{error}</div>}

          {/* Display no orders message */}
          {!loading && orders.length === 0 && (
            <div className={classes.no_orders}>
              You haven't placed any orders yet.
            </div>
          )}

          {/* Display orders */}
          <div className={classes.orders_list}>
            {orders.map((eachOrder) => (
              <div key={eachOrder.id} className={classes.order_item}>
                <div className={classes.order_header}>
                  <p>Order ID: {eachOrder.id}</p>
                  <p>
                    Order Date:{" "}
                    {new Date(
                      eachOrder.data.created * 1000
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    Total Amount: ${(eachOrder.data.amount / 100).toFixed(2)}
                  </p>
                </div>
                <div className={classes.order_products}>
                  {eachOrder.data.basket.map((order) => (
                    <ProductCard
                      flex={true}
                      Product={order}
                      key={order.id}
                      renderAdd={false}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
