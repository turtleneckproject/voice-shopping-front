import React, { Component } from "react";
import './App.css';
import "./static/fonts/fonts.css";
// import Container from './component/Container';
// import Header from './component/Header';
// import TopMenuBar from './component/TopMenuBar';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import JoinPage from "./pages/join";
import MainPage from "./pages/index";
import ProductPage from "./pages/product";
import CartPage from "./pages/cart";
import Header from "./component/Header";
import SearchPage from "./pages/search";
import PayPage from "./pages/pay";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ScrollToTop>
            <Switch>
                <Route exact path="/" component={ MainPage } />
                <Route path="/search/:keyword" component={ SearchPage } />
                <Route path="/product" component={ ProductPage } />
                <Route path="/join" component={ JoinPage } />
                <Route path="/cart" component={ CartPage } />
                <Route path="/pay" component={ PayPage } />
            </Switch>
            </ScrollToTop>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;