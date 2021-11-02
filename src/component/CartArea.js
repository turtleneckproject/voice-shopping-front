import { useEffect, useState } from 'react';
import './CartArea.css';

const CartArea = (props) => {
    const [cartPrice, setCartPrice] = useState(props.info.price);
    const [itemCount, setItemCount] = useState(1);

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
        let price = props.info.price*itemCount;
        setCartPrice(price);
        // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },[itemCount]);

    return(
        <div className="cart_entire">
            <table className="cart_table">
                <tr className='cart_item'>{/*첫번째 줄 시작 */}
                    <th className="cart_item_img"><img src={props.info.imgSrc} alt="제품이미지" /></th>
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
                        <div>{cartPrice}원</div>
                    </th>
                    <th className="cart_item_del">
                        <button class="delete"><img src="img/remove_cart.png" alt="제품이미지" /></button>
                    </th>
                </tr>{/* 첫번째 줄 끝 */}
                <tr className='cart_item'>{/*두번째 줄 시작 */}
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
                </tr>
            </table>
            <div class="side">
                <strong>결제 예정금액</strong>
                <ul className="receipt">
                    <li className="list">
                        <span className="label">상품금액</span>
                    </li>
                    <li className="list">
                        <span className="label">배송비</span>
                    </li>
                    <li className="list">
                        <span className="label">할인금액</span>
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

export default CartArea;