import './PayArea.css';

export default function PayArea(){
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
                        <span className="label">상품가격 </span> <strong>18,000원</strong>
                    </li>
                    <li className="list">
                        <span className="label">쿠폰 할인 </span> <strong>-1,000원</strong>
                    </li>
                    <li className="list">
                        <span className="label">포인트 사용 </span><strong>-0원</strong>
                    </li>
                    <li className="list">
                        <span className="label">배송비 </span> <strong>2,500원</strong>
                    </li>
                    <br/>
                <div class="sum">
                    총 결제금액 <strong>19,500원</strong>
                </div>
                </ul>
                <form action="http://localhost:3000/" method="get">
                    <button type="submit" class="cart_order_btn" onClick={pay}>결제하기</button>
                </form>
            </div>
    ); 
}