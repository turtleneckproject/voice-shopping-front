import './PayInfo.css';

export default function PayInfo(){
    return(
            <div class="side">
                <ul>
                <div class="side_title">주문 상품 정보</div>
                <br/>
                <li className="list">
                <img src="img/sample_img_2.jpg" class="bread" alt="bread"/>
                </li>
                    <li className="list">
                        <span className="label">(발효종)프랑스 바게트</span>
                    </li>
                    <li className="list">
                        <span className="label">50cm 롱바게트 5ea</span>
                    </li>
                    <li className="list">
                        <span className="label">18,000원</span>
                    </li>
                </ul>
            </div>
    ); 
}