import React, { useEffect, useState } from 'react';
import './PayArea.css';
import { useHistory } from "react-router";

const PayArea = (props) => {
    const history = useHistory();
    const [info, setInfo] = useState({});

    const [info2, setInfo2] = useState(0);

    useEffect(()=>{
        console.log("들어온 값: ", props.price);
        setInfo2(props.price);
    },[props.price]);

    useEffect(()=>{
        console.log("들어온 값: ", props.productInfo);
        setInfo(props.productInfo);
    },[props.productInfo]);

    function pay() {
        if (window.confirm("결제하시겠습니까?") == true){  //확인
            window.alert('결제가 완료되었습니다.');
            document.form.submit();
        } else{  //취소
                return;
            }
        }

    return(
            <div class="side_area">
                <ul>
                <div class="side_title">최종 결제금액</div>
                <br/>
                    <li className="list">
                        <span className="label">상품가격 </span> <strong>{info2}원</strong>
                    </li>
                    <li className="list">
                        <span className="label">쿠폰 할인 </span> <strong>0원</strong>
                    </li>
                    <li className="list">
                        <span className="label">포인트 사용 </span><strong>0원</strong>
                    </li>
                    <li className="list">
                        <span className="label">배송비 </span> <strong>0원</strong>
                    </li>
                    <br/>
                <div class="sum">
                    총 결제금액 <strong>{info2}원</strong>
                </div>
                </ul>
                <form action="http://localhost:3000/" method="get">
                    <button type="submit" class="cart_order_btn" onClick={pay}>결제하기</button>
                </form>
            </div>
    ); 
}

export default PayArea;