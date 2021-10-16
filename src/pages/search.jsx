import React from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '../component/Breadcrumbs';
import ProductGrid from '../component/ProductGrid';
import SearchFilter from '../component/SearchFilter';
import SearchResult from '../component/SearchResult';
// import ReactDOM from 'react-dom';
import '../index.css';
import '../component/Container.css';
import Header from '../component/Header';
// import App from '../App';
// import reportWebVitals from '../reportWebVitals';
// import "../static/fonts/fonts.css";

const SearchPage = (props) => {
  // const query = useParams().keyword;
  return (
    <div>
      <Header voiceInput={props.voiceInput}/>
      <div className="Container">
        <Breadcrumbs />
        <SearchFilter />
        <SearchResult />
        <ProductGrid keyword={useParams().keyword} voice={props.voice} voiceInput={props.voiceInput}/>
      </div>
      <footer>
          <p>Footer Area</p>
      </footer>
    </div>
  );
};

export default SearchPage;