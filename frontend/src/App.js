import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import webfont from "webfontloader";
import React from "react";
import Home from "./components/Home/Home.js";

import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/admin/Dashboard.js";
import ProductList from "./components/admin/ProductList.js";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UserList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <Route exact path="/contact" component={Contact}></Route>

        <Route exact path="/about" component={About}></Route>

        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

        <Route
          component={NotFound}
        ></Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
