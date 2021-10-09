import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({info}) => {
    const { title, link, image, lprice, hprice, mallName, productId, productType, brand, maker, category1, category2, category3, category4 } = info;
    var price = lprice;
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var newTitle = title.toString().replace(/(<([^>]+)>)/ig, "").replace(/&quot;/g, "").replace(/\"n/, "").replace(/&amp;/g, "");
    return(
        <div className="product">
            <div className="product_image">
                <Link to="/product"><img src={image} alt="상품 이미지" /></Link>
            </div>
            <p className="grid_product_name"><Link to="/product">{newTitle}</Link></p>
            <p className="grid_product_price">
                <p className="grid_product_price_number">{price}</p>
                원
            </p>
        </div>
    );
}

export default Product;