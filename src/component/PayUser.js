import './PayUser.css';

export default function PayUser(){
    return(
            <div class="side_user">
                <ul >
                <div class="side_title">주문자 정보
                </div> 
                <br/>
                    <li className="list">
                        <span className="label">김진우</span>
                    </li>
                    <li className="list">
                        <span className="label">01042951042</span>
                    </li>
                    <li className="list">
                        <span className="label">bluekjw3516@naver.com</span>
                    </li>
                </ul>
            </div>
    ); 
}