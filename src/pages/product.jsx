import React from "react";
import Breadcrumbs from "../component/Breadcrumbs";
import Header from "../component/Header";
import '../component/Container.css';
import '../component/Footer.css';
import ProductSerialArea from "../component/ProductSerialArea";
import ProdectOrderArea from "../component/ProductOrderArea";
import TabMenuArea from "../component/TabMenuArea";
import MainContent from "../component/MainContent";


const ProductPage = () => {
    return (
    <div>
        <Header />
        <div className="Container">
            <Breadcrumbs />
            <ProductSerialArea />
            <ProdectOrderArea />
            <TabMenuArea />
            <MainContent />
        </div>
        <footer>
            <p>Footer Area</p>
        </footer>
    </div>
    );
};
export default ProductPage;