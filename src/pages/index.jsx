import React from 'react';
import Breadcrumbs from '../component/Breadcrumbs';
import Header from '../component/Header';
import ProductGrid from '../component/ProductGrid';
import SearchFilter from '../component/SearchFilter';
import SearchResult from '../component/SearchResult';
// import ReactDOM from 'react-dom';
import '../index.css';
import '../component/Container.css';
// import App from '../App';
// import reportWebVitals from '../reportWebVitals';
// import "../static/fonts/fonts.css";

const MainPage = () => {
  return (
    <div>
      <Header />
      <div className="Container">
        <Breadcrumbs />
        <SearchFilter />
        <SearchResult />
        <ProductGrid />
      </div>
      <footer>
          <p>Footer Area</p>
      </footer>
    </div>
  );
};

export default MainPage;