import React from 'react';
import Breadcrumbs from '../component/Breadcrumbs';
import ProductGrid from '../component/ProductGrid';
import SearchFilter from '../component/SearchFilter';
import SearchResult from '../component/SearchResult';
// import ReactDOM from 'react-dom';
import '../index.css';
import '../css/Mainpage.css'
import Logo from '../component/Logo';
import SearchBar from '../component/SearchBar';
// import App from '../App';
// import reportWebVitals from '../reportWebVitals';
// import "../static/fonts/fonts.css";

const MainPage = () => {
  return (
    <div className="main_page">
      <div className="main_logo"><Logo /></div>
        <SearchBar />
    </div>
  );
};

export default MainPage;