import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {

    const history = useHistory();
    useEffect(()=>{
    }, [props.voice]);

    const price = props.info.lprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const newTitle = props.info.title.toString().replace(/(<([^>]+)>)/ig, "").replace(/&quot;/g, "").replace(/\"n/, "").replace(/&amp;/g, "");
    
    return(
        <div className="product">
            <div className="product_image">
                {props.voice === "상세보기" && history.push({
                    pathname:  `/product/${props.info.productId}`,
                    state:{
                        imgSrc: props.info.image,
                        title: newTitle,
                        mallName: props.info.mallName,
                        id: props.info.productId,
                        price: price,
                        maker: props.info.maker,
                        brand: props.info.brand
                    }
                })
                }
                
                <Link to={{
                    pathname: `/product/${props.info.productId}`,
                    props:{
                        imgSrc: props.info.image,
                        title: newTitle,
                        mallName: props.info.mallName,
                        id: props.info.productId,
                        price: price,
                        maker: props.info.maker,
                        brand: props.info.brand
                    }
                }}><img src={props.info.image} alt="상품 이미지" /></Link>
            </div>
            <div className="grid_product_name"><Link to="/product">{newTitle}</Link></div>
            <div className="grid_product_price">
                <p className="grid_product_price_number">{price}</p>
                <p>원</p>
            </div>
        </div>
    );
}

export default Product;