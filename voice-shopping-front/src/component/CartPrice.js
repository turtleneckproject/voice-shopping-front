import React, { useEffect, useState } from 'react';
import './CartArea.css';
import { useHistory } from "react-router";

const CartPrice = (props) => {
    const history = useHistory();
    const [info, setInfo] = useState({});
    const [num, setNum] = useState();

    useEffect(()=>{
        console.log("들어온 값: ", props.productInfo);
        setInfo(props.productInfo);
    },[props.productInfo]);

    useEffect(()=>{
        if (props.idx === props.targetIdx){
            props.setProduct({
                set: 1,
                idx: props.targetIdx,
                title: props.info.title,
                price: props.info.price
            });
        }
    },[]);
    
    const [cartPrice, setCartPrice] = useState(props.info.price);
    const [itemCount, setItemCount] = useState(1);
    const [cartTitle, setCartTitle] = useState("");
    const [cartPrice2, setCartPrice2] = useState(0);

    useEffect(()=>{
        const price = props.info.price + "";
        const temp = `${price}`.replace(",", "");
        const temp2 = parseInt(temp)*itemCount;
        let totalPrice = 0;
        totalPrice = totalPrice + temp2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setCartPrice(totalPrice);
        setCartPrice2(cartPrice2 + temp2)
        console.log("@@@@@@"+cartPrice2)
        setNum(totalPrice);
        setCartTitle(cartTitle + props.info.title)
        console.log("#######"+cartTitle)
    });

    return(
        <div className="cart_entire">
                        <div class="side">
                <strong>결제 예정금액</strong>
                <ul className="receipt">
                    <li className="list">
                        <span className="label">상품금액 </span>{cartPrice}
                    </li>
                    <li className="list">
                        <span className="label">배송비 </span>0
                    </li>
                    <li className="list">
                        <span className="label">할인금액 </span>0
                    </li>
                </ul>
                <div class="sum">
                    <span >합계 <strong>{cartPrice}원</strong></span>
                </div>
                <button type="button" class="cart_order_btn">주문</button>
            </div>
        </div>
    ); 
}

export default CartPrice;