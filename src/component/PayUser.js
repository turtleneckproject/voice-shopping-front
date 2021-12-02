import './PayUser.css';

export default function PayUser(){
    return(
            <div class="side_user">
                <ul >
                <div class="side_title">주문자 정보
                <button class="change">변경</button>
                </div> 
                <br/>
                    <li className="list">
                        <span className="label">홍길동</span>
                    </li>
                    <li className="list">
                        <span className="label">01012345678</span>
                    </li>
                    <li className="list">
                        <span className="label">bluekjw3516@naver.com</span>
                    </li>
                </ul>
            </div>
    ); 
}