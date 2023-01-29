import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Checkout from "./pages/Checkout";
import GoogleAuth from "./pages/GoogleAuth";
import Home from "./pages/Homepage";
import Restaurant from "./pages/Restaurant";

// components
import Overview from "./components/Restaurant/Overview";
import Order from "./components/Restaurant/Order";
import Menu from "./components/Restaurant/Menu";
import Review from "./components/Restaurant/Review";
import Photos from "./components/Restaurant/Photos";
import Restaurantlayout from "./layout/Restaurantlayout";

import { useDispatch } from "react-redux";
import { getMySelf } from "./redux/reducers/user/user.action";
import { getCart } from "./redux/reducers/cart/cart.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySelf());
    dispatch(getCart());
  }, [localStorage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/delivery" />} />
        <Route path="/:type" element={<Home />} />
        <Route path="/google/:token" element={<GoogleAuth />} />
        <Route path="/restaurant/:id" element={
            <Restaurantlayout>
              <Restaurant />
            </Restaurantlayout>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="order" element={<Order />} />
          <Route path="review" element={<Review />} />
          <Route path="menu" element={<Menu />} />
          <Route path="photos" element={<Photos />} />
        </Route>
        <Route path="/checkout/orders" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;