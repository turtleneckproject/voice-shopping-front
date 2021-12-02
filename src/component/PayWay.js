import './PayWay.css';
function getRadioText(event)  {
    const radioId = event.target.id;
    const query = 'label[for="'+ radioId + '"]'
    const text = 
          document.querySelector(query).innerText;
    
    window.alert(text);
  }

export default function PayWay(){

    return(
            <div class="side_way">
                <div class="side_way_title">결제 방법</div>
                <br/>
                    <input type="radio" class="radio_btn" name="chk_info" value="신용카드" onClick={getRadioText} id='s'/><label for="s">신용카드</label>
                    <br/>
                    <input type="radio" class="radio_btn" name="chk_info" value="가상계좌" onClick={getRadioText} id='g'/><label for="g">가상계좌</label>
                    <br/>
                    <input type="radio" class="radio_btn" name="chk_info" value="무통장 입금" onClick={getRadioText} id='m'/><label for="m">무통장 입금</label>
                    <br/>
                    <input type="radio" class="radio_btn" name="chk_info" value="핸드폰 결제" onClick={getRadioText} id='h'/><label for="h">핸드폰 결제</label>
                    <br/>
                    <input type="radio" class="radio_btn" name="chk_info" value="카카오페이" onClick={getRadioText} id='k'/><label for="k">카카오페이</label>
                    <div id='result'></div>
            </div>
    ); 
}