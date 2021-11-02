import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import './ProductOrderArea.css';
import starImg from "../img/star.png";
import dotImg from "../img/dot.png";

const ProductOrderArea = (props) => {
    const history = useHistory();
    const [info, setInfo] = useState({});

    useEffect(()=>{
        console.log("들어온 값: ", props.productInfo);
        setInfo(props.productInfo);
    },[props.productInfo]);

    return(
        <div className="product_order_area">
            {props.nextAction === "put_cart" && history.push({
                pathname: `/cart`,
                state: {
                    imgSrc: info.imgSrc,
                    title: info.title,
                    price: info.price
                }
            })}
            <div class="product_img"><img src={info.imgSrc} alt="상품 이미지" /></div>
            <div class="product_info_area">
                <div class="product_rate_and_order_area">
                    <img src={starImg} alt="rate" class="product_rate_img" />
                    <p class="product_rate_number">5.0</p>
                    <img src={dotImg} alt="dot" class="dot" />
                    <p class="product_order_number">3,210 주문</p>
                </div>
                <div class="product_maininfo_area">
                    <div class="product_name"><p>{info.title}</p></div>
                    <div class="product_price"><p>{info.price}원</p></div>
                </div>
                <div class="product_shipping_area">
                    <div class="shipping_price">무료배송</div>
                    <div class="shipping_company">??택배</div>
                    <div class="shipping_start_date">?월 ??일 발송 예정</div>
                    <div class="shipping_end_date">?월 ??일 도착 예정</div>
                </div>
                <div class="product_select_area">
                    <div class="product_option"><p>옵션 1.</p></div>
                </div>
                <div class="product_buy_area">
                    <Link to="/cart"><button class="cart">장바구니</button></Link>
                    <button class="buy">주문하기</button>
                </div>
            </div>
        </div>
    );
}

export default ProductOrderArea;