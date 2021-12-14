import React, { useEffect, useState } from 'react';
import './CartArea.css';
import { useHistory } from "react-router";

const CartArea = (props) => {
    const history = useHistory();
    const [info, setInfo] = useState({});
    const [num, setNum] = useState();

    useEffect(()=>{
        setInfo(props.productInfo);
        console.log(props.idx)
    },[props.productInfo]);
    
    const [cartPrice, setCartPrice] = useState(0);
    const [itemCount, setItemCount] = useState(1);
    const [cartNum, setCartNum] = useState(props.info.num)

    const count = (type, result) => {
        // 결과를 표시할 element
        // const resultElement = document.getElementById(result);
            
        // 현재 화면에 표시된 값
        // let number = resultElement.innerText;
    
        // 더하기/빼기
        if(type === 'plus') {
        setItemCount(itemCount+1);
        }else if(type === 'minus')  {
            if(itemCount === 0) { }
            else { setItemCount(itemCount-1); }
        }
    
        // 결과 출력
        // resultElement.innerText = number;
    }

    useEffect(()=>{
        const price = props.info.price + "";
        const temp = price.replace(/,/g, "");
        const temp2 = parseInt(temp)*itemCount;
        const productPrice = temp2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setCartPrice(productPrice);
        console.log("####"+productPrice)
        setNum(itemCount);
    }, [itemCount]);

    return(
        <div className="cart_entire">
            <table className="cart_table">
                <tr className='cart_item'>

                    <th className="cart_item_img"><img src={props.info.image} alt="제품이미지" /></th>
                    <th className="cart_item_dsc"><strong>{props.info.title}</strong></th>
                    <th className="count_btn">
                        <input type='button'
                            onClick={() => {
                                count('plus', 'result');
                            }}
                        value='+'/>
                        <span className="count_btn_amount" id='result'>{itemCount}</span>
                        <input type='button'
                            onClick={()=>{
                                count('minus', 'result');
                            }}
                        value='-'/>
                    </th>
                    <th className="cart_item_price">
                        <div>{props.info.price}원</div>
                    </th>
                    <th className="cart_item_del">
                        <button class="delete"><img src="img/remove_cart.png" alt="제품이미지" /></button>
                    </th>
                </tr>{/* 첫번째 줄 끝 */}
                {/*두번째 줄 시작 */}
                {/* <tr className='cart_item'>
                    <th className="cart_item_img"><img src="img/cart_sample_2.jpg" alt="제품이미지"/></th>
                    <th className="cart_item_dsc"><strong>Garmin 포어러너 45 GPS 스마트 워치 42mm 코치 트레이닝 플랜 기능 블랙</strong></th>
                    <th className="count_btn">
                        <input type='button'
                            onClick={()=>{
                                count('plus', 'result2');
                            }}
                        value='+'/>
                        <span className="count_btn_amount" id='result2'>1</span>
                        <input type='button'
                            onClick={()=>{
                                count('minus', 'result2');
                            }}
                        value='-'/>
                    </th>
                    <th className="cart_item_price">
                        <div>199,480원</div>
                    </th>
                    <th className="cart_item_del">
                        <button class="delete"><img src="img/remove_cart.png" alt="제품이미지" /></button>
                    </th>
                </tr> */}
            </table>

        </div>
    ); 
}

export default CartArea;