import React, { Component } from "react";
import './App.css';
import "./static/fonts/fonts.css";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import JoinPage from "./pages/join";
import MainPage from "./pages/index";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import PayPage from "./pages/pay";


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ScrollToTop>
            <Route path="/" component={ MainPage } exact/>
            <Route path="/product" component={ ProductPage } />
            <Route path="/join" component={ JoinPage } />
            <Route path="/cart" component={ CartPage } />
            <Route path="/pay" component={ PayPage } />
          </ScrollToTop>
        </Router>
      </div>
      
    );
  }
}

export default App;