import "./Product.css";
import { Link } from "react-router-dom";

export default function Product(props){
    return(
        <div className="product">
            <div className="product_image">
                <Link to="/product"><img src={props.img} alt="상품 이미지" /></Link>
            </div>
            <p className="product_name"><Link to="/product">상품명</Link></p>
            <p className="product_price">
                <p className="product_price_number">12,540</p>
                원
            </p>
        </div>
    );
}