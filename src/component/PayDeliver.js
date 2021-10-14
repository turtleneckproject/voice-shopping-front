import './PayDeliver.css';

export default function PayDeliver(){
    return(
            <div class="side_deliver">
                <ul>
                <div class="side_title">배송 정보
                <button class="change_deliver">변경</button>
                </div>
                <br/>
                    <li className="list">
                        <span className="label">홍길동</span>
                    </li>
                    <li className="list">
                        <span className="label">01012345678</span>
                    </li>
                    <li className="list">
                        <span className="label">서울특벽시 서대문구 성산로7킬 89-8(연희동)</span>
                    </li>
                    <li className="list">
                        <span className="label">(03706))</span>
                    </li>
                </ul>
            </div>
    ); 
}