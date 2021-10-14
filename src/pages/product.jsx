import React, { useEffect, useState } from "react";
import Breadcrumbs from "../component/Breadcrumbs";
import Header from "../component/Header";
import '../component/Container.css';
import '../component/Footer.css';
import ProductSerialArea from "../component/ProductSerialArea";
import ProductOrderArea from "../component/ProductOrderArea";
import TabMenuArea from "../component/TabMenuArea";
import MainContent from "../component/MainContent";


const ProductPage = ({location}) => {
    const [info, setInfo] = useState({});

    useEffect(()=>{
        console.log("받아온 값: " , location.props);
        setInfo(location.props);
    },[location.props]);

    return (
    <div>
        <Header />
        <div className="Container">
            <Breadcrumbs />
            <ProductSerialArea productId={info.id}/>
            <ProductOrderArea productInfo={info}/>
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