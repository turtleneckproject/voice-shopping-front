import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";

const CartTitle = (props) => {
    const history = useHistory();
    const [info, setInfo] = useState({});
    const [info2, setInfo2] = useState([]);

    useEffect(()=>{
        console.log("들어온 값: ", props.productInfo);
        setInfo(props.productInfo);
    },[props.productInfo])

    useEffect(()=>{
        setInfo2(props.nums);
        console.log("수량"+props.nums)
    },[props.nums2])

return(
    <div className="cart_title">
    <p className="subName">장바구니</p>
    </div>
)
};
export default CartTitle