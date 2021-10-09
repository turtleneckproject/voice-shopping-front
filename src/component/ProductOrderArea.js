import { Link } from 'react-router-dom';
import './ProductOrderArea.css';

export default function ProdectOrderArea(){
    return(
        <div className="product_order_area">
            <div class="product_img"></div>
            <div class="product_info_area">
                <div class="product_rate_and_order_area">
                    <img src="img/star.png" alt="rate" class="product_rate_img" />
                    <p class="product_rate_number">5</p>
                    <img src="img/dot.png" alt="dot" class="dot" />
                    <p class="product_order_number">3,210 주문</p>
                </div>
                <div class="product_maininfo_area">
                    <div class="product_name"><p>상품 이름</p></div>
                    <div class="product_price"><p>12,540원</p></div>
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