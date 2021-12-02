import React, { useEffect, useState } from 'react';
import './PayInfo.css';
import { useHistory } from "react-router";

const PayInfo = (props) => {
    const history = useHistory();
    const [info, setInfo] = useState({});

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

    return(
            <div class="side">
                <ul>
                <div class="side_title">주문 상품 정보</div>
                <br/>
                <li className="list">
                <img src={props.info.image}  class="bread" alt="제품이미지"/>
                </li>
                    <li className="list">
                        <span className="label">{props.info.title}</span>
                    </li>
                    <li className="list">
                        <span className="label">{props.info.price}원</span>
                    </li>
                </ul>
            </div>
    ); 
}

export default PayInfo;